package review

import (
	"context"
	"review/app"
	"review/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	ops "go.mongodb.org/mongo-driver/mongo/options"
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

func (s *storage) GetAllCompany(ctx context.Context, pgSize, pgNum int) ([]ByCompany, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Company)

	// check if pgsize is empty
	// if yes set the default value

	// find all
	cursor, err := collection.Find(ctx, bson.M{}, ops.Find().SetLimit(int64(pgSize)).SetSkip(int64(pgSize*pgNum)))
	if err != nil {
		return nil, err
	}

	var companies []ByCompany
	if err := cursor.All(ctx, &companies); err != nil {
		return nil, err
	}

	return companies, nil
}

func (s *storage) GetReviewByOverview(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]OverView, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Overview)
	app.GetLoggerFromCtx(ctx).Info("overview", zap.String("company", companyDomain),
		zap.Int("pgSize", pgSize), zap.Int("pgNum", pgNum),
		zap.Int("pgSize", pgSize), zap.Int("pgSize", pgSize))

	// use pagination for frontend
	cursor, err := collection.Find(ctx, bson.M{"company": companyDomain},
		// use pagination for frontend and sort newest first
		options.Find().
			SetLimit(int64(pgSize)).
			SetSkip(int64(pgSize*pgNum)).
			SetSort(bson.M{"created_at": -1}))
	if err != nil {
		return nil, err
	}

	var reviews []OverView
	if err := cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}
	return reviews, nil
}

func (s *storage) GetReviewBySalary(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]Salary, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Salary)

	// use pagination for frontend
	cursor, err := collection.Find(ctx, bson.M{"company": companyDomain},
		options.Find().
			SetLimit(int64(pgSize)).
			SetSkip(int64(pgSize*pgNum)).
			SetSort(bson.M{"created_at": -1}))

	if err != nil {
		return nil, err
	}

	var reviews []Salary
	if err := cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}
	return reviews, nil
}

func (s *storage) GetReviewByBenefit(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]Benefit, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Benefit)

	// use pagination for frontend
	cursor, err := collection.Find(ctx, bson.M{"company:": companyDomain}, ops.Find().SetLimit(int64(pgSize)).SetSkip(int64(pgSize*pgNum)))
	if err != nil {
		return nil, err
	}

	var reviews []Benefit
	if err := cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}

	return reviews, nil
}

func (s *storage) GetReviewByInterview(ctx context.Context, companyDomain string, pgSize, pgNum int) ([]Interview, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Interview)

	// use pagination for frontend
	cursor, err := collection.Find(ctx, bson.M{"company": companyDomain}, ops.Find().SetLimit(int64(pgSize)).SetSkip(int64(pgSize*pgNum)))
	if err != nil {
		return nil, err
	}

	var reviews []Interview
	if err := cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}

	return reviews, nil
}
