class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    //search is feature
    const keyword = this.queryStr.keyword
      ? {
          "brand.name": {
            $regex: this.queryStr.keyword, //$regex is mongodb express reguler expression
            $options: "i", // i means case insensitive
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr }; //keyword spreaded

    //removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and rating
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }
  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const itemsInPage = Number(resultPerPage);
    const skip = itemsInPage * (currentPage - 1);
    this.query = this.query.limit(itemsInPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;
