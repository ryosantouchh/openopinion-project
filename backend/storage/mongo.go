package storage

import (
	"context"
	"fmt"
	"net/url"
	"review/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

func NewMongoClient(cfg config.Mongo) (*mongo.Client, error) {
	// create a new context
	ctx := context.Background()
	password := url.QueryEscape(cfg.Password)

	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	uri := fmt.Sprintf("mongodb+srv://%s:%s@%s",
		cfg.Username, password, cfg.Host)

	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(ctx, opts)
	if err != nil {
		return nil, fmt.Errorf("error while connecting to mongodb: %w", err)
	}

	// check the connection
	rp := readpref.Primary()
	err = client.Ping(ctx, rp)
	if err != nil {
		return nil, fmt.Errorf("error while pinging mongodb: %w", err)
	}

	return client, nil
}
