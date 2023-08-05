package main

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

type CreateGemRequest struct {
	Username    string   `json:"username"`
	UserID      int      `json:"userId"`
	Name        string   `json:"name"`
	Location    string   `json:"location"`
	Description string   `json:"description"`
	Category    string   `json:"category"`
	Latitude    string   `json:"latitude"`
	Longitude   string   `json:"longitude"`
	Rating      float32  `json:"rating"`
	Images      []string `json:"images"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Username string `json:"username"`
	UserID   int    `json:"userId"`
	Email    string `json:"email"`
	Token    string `json:"token"`
}

type RegisterRequest struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type RegisterResponse struct {
	Username string `json:"username"`
	UserID   int    `json:"userId"`
	Email    string `json:"email"`
	Token    string `json:"token"`
}

type Gem struct {
	ID           int       `json:"id"`
	Username     string    `json:"username"`
	UserID       int       `json:"userId"`
	Name         string    `json:"name"`
	Location     string    `json:"location"`
	Description  string    `json:"description"`
	Category     string    `json:"category"`
	Latitude     string    `json:"latitude"`
	Longitude    string    `json:"longitude"`
	Rating       float32   `json:"rating"`
	NumOfRatings int       `json:"numOfRatings"`
	Images       []string  `json:"images"`
	CreatedAt    time.Time `json:"createdAt"`
}
type User struct {
	ID                int       `json:"id"`
	FirstName         string    `json:"firstName"`
	LastName          string    `json:"lastName"`
	Username          string    `json:"username"`
	Email             string    `json:"email"`
	EncryptedPassword string    `json:"-"`
	CreatedAt         time.Time `json:"createdAt"`
}

func (u *User) ValidPassword(pw string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.EncryptedPassword), []byte(pw)) == nil
}

func NewGem(username string, userId int, name string, location string, description string, category string, latitude string, longitude string, rating float32, images []string) (*Gem, error) {
	return &Gem{
		Username:     username,
		UserID:       userId,
		Name:         name,
		Location:     location,
		Description:  description,
		Category:     category,
		Latitude:     latitude,
		Longitude:    longitude,
		Rating:       rating,
		NumOfRatings: 1,
		Images:       images,
		CreatedAt:    time.Now().UTC(),
	}, nil
}

func NewUser(firstName string, lastName string, username string, email string, password string) (*User, error) {
	encpw, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return nil, err
	}

	return &User{
		FirstName:         firstName,
		LastName:          lastName,
		Username:          username,
		Email:             email,
		EncryptedPassword: string(encpw),
		CreatedAt:         time.Now().UTC(),
	}, nil
}
