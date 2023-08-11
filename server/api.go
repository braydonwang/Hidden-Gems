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
	router.HandleFunc("/gems/{id}", makeHTTPHandleFunc(s.handleGem))
	router.HandleFunc("/gems/min-lat={minLat}&max-lat={maxLat}&min-lng={minLng}&max-lng={maxLng}", makeHTTPHandleFunc(s.handleGetGemsByBounds))
	router.HandleFunc("/gems/review/{id}", makeHTTPHandleFunc(s.handleGemReview))

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

func (s *APIServer) handleGem(w http.ResponseWriter, r *http.Request) error {
	id, err := getID(r)
	if err != nil {
		return err
	}

	if r.Method == "DELETE" {
		return s.handleDeleteGem(w, r, id)
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
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return err
	}

	curGem, err := s.store.GetGemByCoords(req.Latitude, req.Longitude)
	if curGem != nil {
		return fmt.Errorf("hidden gem at this location has already been created")
	}
	if err != nil {
		return err
	}

	gem, err := NewGem(req.Username, req.UserID, req.Name, req.Location, req.Description, req.Category, req.Latitude, req.Longitude, req.Rating, req.Images)
	if err != nil {
		return err
	}

	if err := s.store.CreateGem(gem); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, gem)
}

func (s *APIServer) handleGetGemsByBounds(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "GET" {
		return fmt.Errorf("method not allowed %s", r.Method)
	}
	minLat, maxLat, minLng, maxLng, err := getBounds(r)
	if err != nil {
		return err
	}

	gems, err := s.store.GetGemsByBounds(minLat, maxLat, minLng, maxLng)
	if err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, gems)
}

func (s *APIServer) handleDeleteGem(w http.ResponseWriter, r *http.Request, id int) error {
	if err := s.store.DeleteGemByID(id); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, id)
}

func (s *APIServer) handleGemReview(w http.ResponseWriter, r *http.Request) error {
	if r.Method != "POST" {
		return fmt.Errorf("method not allowed %s", r.Method)
	}

	id, err := getID(r)
	if err != nil {
		return err
	}

	var req ReviewGemRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		return err
	}

	if err := s.store.ReviewGem(id, req.UserID, req.Rating); err != nil {
		return err
	}

	return WriteJSON(w, http.StatusOK, id)
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
		Username: user.Username,
		UserID:   user.ID,
		Email:    user.Email,
		Token:    token,
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

	curUser, _ := s.store.GetUser(req.Email)
	if curUser != nil {
		return fmt.Errorf("email already in use: %s", req.Email)
	}

	user, err := NewUser(req.FirstName, req.LastName, req.Username, req.Email, req.Password)
	if err != nil {
		return err
	}

	id, err := s.store.CreateUser(user)
	if err != nil {
		return err
	}

	token, err := createJWT(user)
	if err != nil {
		return err
	}

	resp := RegisterResponse{
		Username: user.Username,
		UserID:   id,
		Email:    user.Email,
		Token:    token,
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

func getBounds(r *http.Request) (string, string, string, string, error) {
	minLat := mux.Vars(r)["minLat"]
	maxLat := mux.Vars(r)["maxLat"]
	minLng := mux.Vars(r)["minLng"]
	maxLng := mux.Vars(r)["maxLng"]

	return minLat, maxLat, minLng, maxLng, nil
}
