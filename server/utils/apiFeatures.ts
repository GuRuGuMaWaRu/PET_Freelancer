import type { Query, HydratedDocument } from 'mongoose';
import type { IQueryString } from '../types'

export class APIFeatures<T> {
  constructor(public query: Query<HydratedDocument<T, {}, {}>[], HydratedDocument<T, {}, {}>, {}, T>, private queryString: IQueryString) {}

  filter() {
    const queryObj: Record<string, string | number> = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach(el => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query.sort(`${sortBy} -date`);
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query.select(fields);
    } else {
      this.query.select("-deleted -user -__v");
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page ? this.queryString.page * 1 : 1;
    const limit = this.queryString.limit ? this.queryString.limit * 1 : 30;
    const skip = (page - 1) * limit;

    if (this.queryString.page || this.queryString.limit) {
      this.query.skip(skip).limit(limit);
    }

    return this;
  }
}
