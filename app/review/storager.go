package review

import (
	"context"
	"review/app"
	"review/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.uber.org/zap"
)

type storage struct {
	cfg   config.Mongo
	mongo *mongo.Client
}

func NewStorage(cfg config.Mongo, mgc *mongo.Client) *storage {
	return &storage{
		mongo: mgc,
		cfg:   cfg,
	}
}

func (s *storage) GetAllCompany(ctx context.Context) ([]ByCompany, error) {
	logger := app.GetLoggerFromCtx(ctx)
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Company)

	// find all
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		return nil, err
	}

	var companies []ByCompany
	if err := cursor.All(ctx, &companies); err != nil {
		return nil, err
	}

	logger.Debug("len", zap.Int("len", len(companies)))
	return companies, nil
}
