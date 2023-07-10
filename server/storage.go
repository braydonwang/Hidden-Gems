package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Storage interface {
	GetUsers() ([]*User, error)
	GetUser(string) (*User, error)
	GetUserByID(int) (*User, error)
	DeleteUser(int) error
	CreateUser(*User) error
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
	return s.createUserTable()
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

func (s *PostgresStore) CreateUser(user *User) error {
	query := `insert into users
	(first_name, last_name, username, email, encrypted_password, created_at)
	values
	($1, $2, $3, $4, $5, $6)`

	_, err := s.db.Query(query, user.FirstName, user.LastName, user.Username, user.Email, user.EncryptedPassword, user.CreatedAt)

	if err != nil {
		return err
	}

	return nil
}

func scanIntoUser(rows *sql.Rows) (*User, error) {
	user := new(User)
	err := rows.Scan(&user.ID, &user.FirstName, &user.LastName, &user.Username, &user.Email, &user.EncryptedPassword, &user.CreatedAt)
	if err != nil {
		return nil, err
	}
	return user, nil
}
