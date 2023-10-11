import axios from 'axios';

class HttpService {
  protected baseUrl: string;

  protected fetchingService: any;

  protected apiVersion: string;

  constructor(
    baseUrl = process.env.REACT_APP_API_URL || '',
    fetchingService = axios,
    apiVersion = 'api'
  ) {
    this.baseUrl = baseUrl;
    this.fetchingService = fetchingService;
    this.apiVersion = apiVersion;
  }

  protected getFullApiUrl(url: string): string {
    return `${this.baseUrl}/${this.apiVersion}/${url}`;
  }

  protected populateTokenToHeaderConfig(): {
    Authorization: string;
  } {
    return {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };
  }

  protected extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: any): any {
    return configWithoutDataAndUrl;
  }

  protected get(
    config: { [x: string]: any; headers?: any; url: any; data?: any },
    withAuth = true
  ): any {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService
      .get(this.getFullApiUrl(config.url), this.extractUrlAndDataFromConfig(config))
      .then((res: any) => res.data);
  }

  protected post(
    config: { [x: string]: any; headers?: any; url: any; data: any },
    withAuth = true
  ): any {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.post(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  protected patch(
    config: { [x: string]: any; headers?: any; url: any; data: any },
    withAuth = true
  ): any {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.patch(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  protected delete(
    config: { [x: string]: any; headers?: any; url: any; data: any },
    withAuth = true
  ): any {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
    return this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }
}

export default HttpService;
