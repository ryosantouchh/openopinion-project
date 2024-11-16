package config

import (
	"log"
	"time"

	"github.com/caarlos0/env/v11"
)

func NewConfig() Config {
	cfg := Config{}
	if err := env.Parse(&cfg); err != nil {
		log.Panicf("failed to parse config: %v", err)
	}
	return cfg
}

type Config struct {
	LogLevel   string `env:"LOG_LEVEL" envDefault:"info"`
	HttpServer HttpServer
	Mongo      Mongo
}
type HttpServer struct {
	Port            string        `env:"HTTP_SERVER_PORT" envDefault:"8080"`
	GracefulTimeout time.Duration `env:"HTTP_SERVER_GRACEFUL_TIMEOUT" envDefault:"30s"`
	Path            HttpServerPath
}
type HttpServerPath struct {
	GetAllCompany string `env:"HTTP_SERVER_PATH_GET_ALL_COMPANY" envDefault:"/api/v1/company"`
	GetOverView   string `env:"HTTP_SERVER_PATH_GET_OVERVIEW" envDefault:"/api/v1/overview"`
	GetSalary     string `env:"HTTP_SERVER_PATH_GET_SALARY" envDefault:"/api/v1/salary"`
	GetBenefit    string `env:"HTTP_SERVER_PATH_GET_BENEFIT" envDefault:"/api/v1/benefit"`
	GetInterview  string `env:"HTTP_SERVER_PATH_GET_INTERVIEW" envDefault:"/api/v1/interview"`
}

type Mongo struct {
	Host       string `env:"MONGO_HOST,required"`
	Username   string `env:"MONGO_USERNAME,required"`
	Password   string `env:"MONGO_PASSWORD,required"`
	Database   string `env:"MONGO_DATABASE_NAME"`
	Collection struct {
		Company   string `env:"MONGO_COLLECTION_COMPANY"`
		Overview  string `env:"MONGO_COLLECTION_OVERVIEW"`
		Salary    string `env:"MONGO_COLLECTION_SALARY"`
		Benefit   string `env:"MONGO_COLLECTION_BENEFIT"`
		Interview string `env:"MONGO_COLLECTION_INTERVIEW"`
	}
	DefaultQueryValue struct {
		Pagesize int `env:"MONGO_DEFAULT_QUERY_VALUE_PAGESIZE" envDefault:"5"`
		Pagenum  int `env:"MONGO_DEFAULT_QUERY_VALUE_PAGENUM" envDefault:"1"`
	}
}
