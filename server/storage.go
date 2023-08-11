package main

import (
	"database/sql"
	"fmt"
	"strconv"
	"strings"

	"github.com/lib/pq"
	_ "github.com/lib/pq"
)

type Storage interface {
	GetGems() ([]*Gem, error)
	GetGemsByBounds(string, string, string, string) ([]*Gem, error)
	GetGemByCoords(string, string) (*Gem, error)
	CreateGem(*Gem) error
	DeleteGemByID(int) error
	ReviewGem(int, int, float32) error
	GetUsers() ([]*User, error)
	GetUser(string) (*User, error)
	GetUserByID(int) (*User, error)
	DeleteUser(int) error
	CreateUser(*User) (int, error)
}

type PostgresStore struct {
	db *sql.DB
}

func NewPostgresStore() (*PostgresStore, error) {
	// TODO: store postgres info in env
	connStr := "user=postgres dbname=postgres password=hiddengems sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		return nil, err
	}

	return &PostgresStore{
		db: db,
	}, nil
}

func (s *PostgresStore) Init() error {
	_, err := s.db.Exec("create extension if not exists postgis")
	if err != nil {
		return err
	}

	if err := s.createUserTable(); err != nil {
		return err
	}

	return s.createGemTable()
}

func (s *PostgresStore) createGemTable() error {
	query := `create table if not exists gems (
		id serial primary key,
		username varchar(50),
		user_id int references users(id),
		name varchar(100),
		location varchar(255),
		description text,
		category varchar(50),
		point geometry(Point, 4326),
		rating numeric(3, 2) check (rating >= 0 and rating <= 5),
		num_ratings integer check (num_ratings >= 0),
		images text[],
		user_reviews int[],
		created_at timestamp
	)`

	_, err := s.db.Exec(query)
	return err
}

func (s *PostgresStore) createUserTable() error {
	query := `create table if not exists users (
		id serial primary key,
		first_name varchar(50),
		last_name varchar(50),
		username varchar(50),
		email varchar(100),
		encrypted_password varchar(100),
		created_at timestamp
	)`

	_, err := s.db.Exec(query)
	return err
}

func (s *PostgresStore) GetGems() ([]*Gem, error) {
	rows, err := s.db.Query("select id, username, user_id, name, location, description, category, ST_X(point) as longitude, ST_Y(point) as latitude, rating, num_ratings, images, user_reviews, created_at from gems")
	if err != nil {
		return nil, err
	}

	gems := []*Gem{}
	for rows.Next() {
		gem, err := scanIntoGem(rows)
		if err != nil {
			return nil, err
		}
		gems = append(gems, gem)
	}

	return gems, nil
}

func (s *PostgresStore) GetGemsByBounds(minLat string, maxLat string, minLng string, maxLng string) ([]*Gem, error) {
	query := `select id, username, user_id, name, location, description, category, ST_X(point) as longitude, ST_Y(point) as latitude, rating, num_ratings, images, user_reviews, created_at from gems
	where ST_Contains(ST_MakeEnvelope($1, $2, $3, $4, 4326), point)`

	rows, err := s.db.Query(query, minLng, maxLat, maxLng, minLat)
	if err != nil {
		return nil, err
	}

	gems := []*Gem{}
	for rows.Next() {
		gem, err := scanIntoGem(rows)
		if err != nil {
			return nil, err
		}
		gems = append(gems, gem)
	}

	return gems, nil
}

func (s *PostgresStore) GetGemByCoords(lat string, lng string) (*Gem, error) {
	query := `select id, username, user_id, name, location, description, category, ST_X(point) as longitude, ST_Y(point) as latitude, rating, num_ratings, images, user_reviews, created_at 
	from gems where ST_X(point) = $1 and ST_Y(point) = $2`

	rows, err := s.db.Query(query, lng, lat)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoGem(rows)
	}

	return nil, nil
}

func (s *PostgresStore) CreateGem(gem *Gem) error {
	query := `insert into gems
	(username, user_id, name, location, description, category, point, rating, num_ratings, images, user_reviews, created_at)
	values
	($1, $2, $3, $4, $5, $6, ST_SetSRID(ST_MakePoint(CAST($7 AS FLOAT), CAST($8 AS FLOAT)), 4326), $9, $10, $11, $12, $13)`
	formattedImageArray := "{" + strings.Join(gem.Images, ",") + "}"
	formattedUserReviews := "{" + strconv.Itoa(gem.UserReviews[0]) + "}"

	_, err := s.db.Query(query, gem.Username, gem.UserID, gem.Name, gem.Location, gem.Description, gem.Category, gem.Longitude, gem.Latitude, gem.Rating, gem.NumOfRatings, formattedImageArray, formattedUserReviews, gem.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

func (s *PostgresStore) DeleteGemByID(id int) error {
	_, err := s.db.Query("delete from gems where id = $1", id)
	if err != nil {
		return err
	}

	return nil
}

func (s *PostgresStore) ReviewGem(id int, userId int, rating float32) error {
	query := "update gems set rating = $1, num_ratings = num_ratings + 1, user_reviews = user_reviews || $2 where id = $3"
	_, err := s.db.Exec(query, rating, pq.Array([]int{userId}), id)
	if err != nil {
		return err
	}

	return nil
}

func (s *PostgresStore) GetUsers() ([]*User, error) {
	rows, err := s.db.Query("select * from users")
	if err != nil {
		return nil, err
	}

	users := []*User{}
	for rows.Next() {
		user, err := scanIntoUser(rows)
		if err != nil {
			return nil, err
		}
		users = append(users, user)
	}

	return users, nil
}

func (s *PostgresStore) GetUser(email string) (*User, error) {
	rows, err := s.db.Query("select * from users where email = $1", email)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoUser(rows)
	}

	return nil, fmt.Errorf("User with email [%s] not found", email)
}

func (s *PostgresStore) GetUserByID(id int) (*User, error) {
	rows, err := s.db.Query("select * from users where id = $1", id)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoUser(rows)
	}

	return nil, fmt.Errorf("User with id [%d] not found", id)
}

func (s *PostgresStore) DeleteUser(id int) error {
	_, err := s.db.Query("delete from users where id = $1", id)
	if err != nil {
		return err
	}

	return nil
}

func (s *PostgresStore) CreateUser(user *User) (int, error) {
	query := `insert into users
	(first_name, last_name, username, email, encrypted_password, created_at)
	values
	($1, $2, $3, $4, $5, $6)
	returning id`

	var id int
	err := s.db.QueryRow(query, user.FirstName, user.LastName, user.Username, user.Email, user.EncryptedPassword, user.CreatedAt).Scan(&id)

	if err != nil {
		return -1, err
	}

	return id, nil
}

func scanIntoGem(rows *sql.Rows) (*Gem, error) {
	gem := new(Gem)
	var tempUserReviews pq.Int64Array
	err := rows.Scan(&gem.ID, &gem.Username, &gem.UserID, &gem.Name, &gem.Location, &gem.Description, &gem.Category, &gem.Longitude, &gem.Latitude, &gem.Rating, &gem.NumOfRatings, pq.Array(&gem.Images), &tempUserReviews, &gem.CreatedAt)
	if err != nil {
		return nil, err
	}
	convUserReviews := make([]int, len(tempUserReviews))
	for i, v := range tempUserReviews {
		convUserReviews[i] = int(v)
	}
	gem.UserReviews = convUserReviews
	return gem, nil
}

func scanIntoUser(rows *sql.Rows) (*User, error) {
	user := new(User)
	err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Username, &user.Email, &user.EncryptedPassword, &user.CreatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}
