const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const splitParams = url.split('?id=');
    const urlsSplits = splitParams[0].split('/');

    return {
      resource: urlsSplits[1] || null,
      params: splitParams[1] || null,
      cityName: urlsSplits[2] || null,
      level: urlsSplits[4] || null,
      verb: urlsSplits[5] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
    + (splitedUrl.params ? '?id' : '')
    + (splitedUrl.cityName ? '/:cityName' : '')
    + (splitedUrl.verb ? `/play` : '');
  },
};

export default UrlParser;