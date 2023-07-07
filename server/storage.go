package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type Storage interface {
	GetUser(string) (*User, error)
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
	query := `create table if not exists user (
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

func (s *PostgresStore) GetUser(email string) (*User, error) {
	rows, err := s.db.Query("select * from user where email = $1", email)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		return scanIntoUser(rows)
	}

	return nil, fmt.Errorf("User with email [%s] not found", email)
}

func (s *PostgresStore) CreateUser(user *User) error {
	query := `insert into user
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
