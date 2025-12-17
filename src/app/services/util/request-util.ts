import { HttpParams } from '@angular/common/http';

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });
    if (req.sort) {
      req.sort.forEach(val => {
        options = options.append('sort', val);
      });
    }
  }
  return options;
};


export const createRequestParamsOption = (req?: any): HttpParams => {
  let params = new HttpParams({
    fromString: req.query
  });
  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort' && key !== 'query') {
        params = params.append(key, req[key]);
      }
    });
    if (req.sort) {
      req.sort.forEach(val => {
        params = params.append('sort', val);
      });
    }
  }
  return params;
};

