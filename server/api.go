package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	jwt "github.com/golang-jwt/jwt/v4"
	"github.com/gorilla/mux"
)

type apiFunc func(http.ResponseWriter, *http.Request) error

type ApiError struct {
	Error string `json:"error"`
}

type APIServer struct {
	listenAddr string
	store      Storage
}

func NewAPIServer(listenAddr string, store Storage) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
		store:      store,
	}
}

func (s *APIServer) Run() {
	router := mux.NewRouter()

	router.HandleFunc("/users", makeHTTPHandleFunc(s.handleGetUsers))
	router.HandleFunc("/user/{id}", makeHTTPHandleFunc(s.handleUser))
	router.HandleFunc("/login", makeHTTPHandleFunc(s.handleLogin))
	router.HandleFunc("/register", makeHTTPHandleFunc(s.handleRegister))
	router.HandleFunc("/gems", makeHTTPHandleFunc(s.handleGems))

	log.Println("JSON API server running on port: ", s.listenAddr)
	http.ListenAndServe(s.listenAddr, router)
}

func (s *APIServer) handleGems(w http.ResponseWriter, r *http.Request) error {
	if r.Method == "GET" {
		return s.handleGetGems(w, r)
	}

	if r.Method == "POST" {
		return s.handleCreateGem(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

func (s *APIServer) handleGetGems(w http.ResponseWriter, r *http.Request) error {
	gems, err := s.store.GetGems()
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, gems)
}

func (s *APIServer) handleCreateGem(w http.ResponseWriter, r *http.Request) error {
	var req CreateGemRequest

}

func (s *APIServer) handleGetUsers(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "GET" {
		return fmt.Errorf("method not allowed %s", r.Method)
	}

	users, err := s.store.GetUsers()
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, users)
}

func (s *APIServer) handleUser(w http.ResponseWriter, r *http.Request) error {
	id, err := getID(r)
	if err != nil {
		return err
	}

	if r.Method == "GET" {
		return s.handleGetUser(w, r, id)
	}
	if r.Method == "DELETE" {
		return s.handleDeleteUser(w, r, id)
	}

	return fmt.Errorf("method not allowed %s", r.Method)
}

func (s *APIServer) handleGetUser(w http.ResponseWriter, r *http.Request, id int) error {
	user, err := s.store.GetUserByID(id)
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, user)
}

func (s *APIServer) handleDeleteUser(w http.ResponseWriter, r *http.Request, id int) error {
	if err := s.store.DeleteUser(id); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, id)
}

func (s *APIServer) handleLogin(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "POST" {
		return fmt.Errorf("method not allowed %s", r.Method)
	}

	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return err
	}

	user, err := s.store.GetUser(req.Email)
	if err != nil {
		return err
	}

	if !user.ValidPassword(req.Password) {
		return fmt.Errorf("incorrect password")
	}

	token, err := createJWT(user)
	if err != nil {
		return err
	}

	resp := LoginResponse{
		Email: user.Email,
		Token: token,
	}

	return WriteJSON(w, http.StatusOK, resp)
}

func (s *APIServer) handleRegister(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "POST" {
		return fmt.Errorf("method not allowed %s", r.Method)
	}

	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return err
	}

	cur_user, err := s.store.GetUser(req.Email)
	if cur_user != nil || err == nil {
		return fmt.Errorf("email already in use: %s", req.Email)
	}

	user, err := NewUser(req.FirstName, req.LastName, req.Username, req.Email, req.Password)
	if err != nil {
		return err
	}

	if err := s.store.CreateUser(user); err != nil {
		return err
	}

	token, err := createJWT(user)
	if err != nil {
		return err
	}

	resp := RegisterResponse{
		Email: user.Email,
		Token: token,
	}

	return WriteJSON(w, http.StatusOK, resp)
}

func makeHTTPHandleFunc(f apiFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w, r); err != nil {
			WriteJSON(w, http.StatusBadRequest, ApiError{Error: err.Error()})
		}
	}
}

func createJWT(user *User) (string, error) {
	claims := &jwt.MapClaims{
		"expiresAt": 15000,
		"email":     user.Email,
	}

	secret := os.Getenv("JWT_SECRET")
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return token.SignedString([]byte(secret))
}

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	return json.NewEncoder(w).Encode(v)
}

func getID(r *http.Request) (int, error) {
	idStr := mux.Vars(r)["id"]
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return 0, fmt.Errorf("invalid id given %s", idStr)
	}
	return id, nil
}
