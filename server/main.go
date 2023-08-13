package main

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var redisKey = "dev:gems:all"
var ctx = context.Background()

func main() {
	store, err := NewPostgresStore()

	if err != nil {
		log.Fatal(err)
	}

	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})

	if _, err := rdb.Ping(ctx).Result(); err != nil {
		log.Fatalf("Could not connect to Redis: %v", err)
	}

	if err := store.Init(); err != nil {
		log.Fatal(err)
	}

	server := NewAPIServer(":8080", store, rdb)
	server.Run()
}
