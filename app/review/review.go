package review

type ByType struct {
	User struct {
		Address string `json:"address"`
	} `json:"user"`
	Company string `json:"company"`
	Review  struct {
		Type    int    `json:"type"`
		Rating  int    `json:"rating"`
		Title   string `json:"title"`
		Content string `json:"content"`
	} `json:"review"`
	CreatedAt string `json:"created_at"`
}

type ByCompany struct {
    Name        string `bson:"name" json:"name"`
    DomainName  string `bson:"domain_name" json:"domain_name"`
    Description string `bson:"description" json:"description"`
    StaffRange  string `bson:"staff_range" json:"staff_range"`
    Score       struct {
        Overview struct {
            TotalCount int     `bson:"total_count" json:"-"` // Hidden from JSON, visible for BSON
            TotalScore float32 `bson:"total_score" json:"-"` // Hidden from JSON, visible for BSON
            Rating     float32 `bson:"-" json:"rating"`      // Calculated field for JSON only
        } `bson:"1" json:"1"`
        Salary struct {
            TotalCount int     `bson:"total_count" json:"-"`
            TotalScore float32 `bson:"total_score" json:"-"`
            Rating     float32 `bson:"-" json:"rating"`
        } `bson:"2" json:"2"`
        Benefit struct {
            TotalCount int     `bson:"total_count" json:"-"`
            TotalScore float32 `bson:"total_score" json:"-"`
            Rating     float32 `bson:"-" json:"rating"`
        } `bson:"3" json:"3"`
        Interview struct {
            TotalCount int     `bson:"total_count" json:"-"`
            TotalScore float32 `bson:"total_score" json:"-"`
            Rating     float32 `bson:"-" json:"rating"`
        } `bson:"4" json:"4"`
    } `bson:"review_score" json:"review_score"`
}


type CompanyScore struct {
	TotalCount int     `json:"-" bson:"total_count"`
	TotalScore float32 `json:"-" bson:"total_score"`
}
