package review

import (
	"context"
	"fmt"
	"review/config"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	ops "go.mongodb.org/mongo-driver/mongo/options"
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

func (s *storage) GetCompanyByName(ctx context.Context, companyDomain string) (ByCompany, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Company)

	var result ByCompany
	// find one
	resultUnBind := collection.FindOne(ctx, bson.M{"domain": companyDomain})
	err := resultUnBind.Decode(&result)
	if err != nil {
		return result, err
	}

	return result, nil

}

func (s *storage) GetReviewByOverview(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]OverView, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Overview)
	query := bson.M{"company": companyDomain}
	// post id is id of record in mongo
	if postId != "" {
		objectID, err := primitive.ObjectIDFromHex(postId)
		if err != nil {
			return nil, fmt.Errorf("invalid post ID format: %w", err)
		}
		query = bson.M{"_id": objectID}
	}

	// use pagination for frontend
	cursor, err := collection.Find(ctx, query,
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

func (s *storage) GetReviewBySalary(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]Salary, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Salary)

	query := bson.M{"company": companyDomain}
	// post id is id of record in mongo
	if postId != "" {
		objectID, err := primitive.ObjectIDFromHex(postId)
		if err != nil {
			return nil, fmt.Errorf("invalid post ID format: %w", err)
		}
		query = bson.M{"_id": objectID}
	}

	// use pagination for frontend
	cursor, err := collection.Find(ctx, query,
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

func (s *storage) GetReviewByBenefit(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]Benefit, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Benefit)

	query := bson.M{"company": companyDomain}
	// post id is id of record in mongo
	if postId != "" {
		objectID, err := primitive.ObjectIDFromHex(postId)
		if err != nil {
			return nil, fmt.Errorf("invalid post ID format: %w", err)
		}
		query = bson.M{"_id": objectID}
	}

	// use pagination for frontend
	cursor, err := collection.Find(ctx, query,
		ops.Find().SetLimit(int64(pgSize)).SetSkip(int64(pgSize*pgNum)))
	if err != nil {
		return nil, err
	}

	var reviews []Benefit
	if err := cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}

	return reviews, nil
}

func (s *storage) GetReviewByInterview(ctx context.Context, companyDomain, postId string,
	pgSize, pgNum int) ([]Interview, error) {
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(s.cfg.Collection.Interview)

	query := bson.M{"company": companyDomain}
	// post id is id of record in mongo
	if postId != "" {
		objectID, err := primitive.ObjectIDFromHex(postId)
		if err != nil {
			return nil, fmt.Errorf("invalid post ID format: %w", err)
		}
		query = bson.M{"_id": objectID}
	}

	// use pagination for frontend
	cursor, err := collection.Find(ctx, query,
		ops.Find().SetLimit(int64(pgSize)).SetSkip(int64(pgSize*pgNum)))
	if err != nil {
		return nil, err
	}

	var reviews []Interview
	if err := cursor.All(ctx, &reviews); err != nil {
		return nil, err
	}

	return reviews, nil
}

func (s *storage) CountReviewByCompanyAndType(ctx context.Context, companyDomain, t string) (int, error) {
	var colName string
	switch t {
	case "overview":
		colName = s.cfg.Collection.Overview
	case "salary":
		colName = s.cfg.Collection.Salary
	case "benefit":
		colName = s.cfg.Collection.Benefit
	case "interview":
		colName = s.cfg.Collection.Interview
	default:
		return 0, fmt.Errorf("invalid review type: %s", t)
	}
	collection := s.mongo.
		Database(s.cfg.Database).
		Collection(colName)

	count, err := collection.CountDocuments(ctx, bson.M{"company": companyDomain})
	if err != nil {
		return 0, err
	}

	return int(count), nil
}
