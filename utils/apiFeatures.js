class APIFeatures {
  constructor(queryObject, queryParams, type) {
    this.queryObject = queryObject;
    this.queryParams = queryParams;
    this.type = type;
  }

  filter() {
    const params = { ...this.queryParams };
    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach(excludedParam => delete params[excludedParam]);

    let queryStr = JSON.parse(
      JSON.stringify(params).replace(
        /\b(gte|gt|lte|lt)\b/g,
        match => `$${match}`
      )
    );

    // Filtering for posts
    if (this.type === "posts") {
      queryStr.title = new RegExp(queryStr.title, "gi");
      queryStr.body = new RegExp(queryStr.body, "gi");
    }

    // Filtering for comments
    if (queryStr.text) {
      queryStr.text = new RegExp(queryStr.text, "gi");
    }

    this.queryObject = this.queryObject.find(queryStr);

    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortBy = this.queryParams.sort.split(",").join(" ");
      this.queryObject = this.queryObject.sort(sortBy);
    } else {
      this.queryObject = this.queryObject.sort("-createdAt");
    }

    return this;
  }

  paginate() {
    const limit = this.queryParams.limit * 1;
    const page = this.queryParams.page * 1;
    const skip = (page - 1) * limit;

    this.queryObject = this.queryObject.limit(limit).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
