import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general',
    searchQuery: ''
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    console.log("hello i am a constuctor from News component");
    this.state = {
      articles: [],
      loading:true,
      page: 1,
      totalResults:0,
      searchQuery: ''

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-NewsDaily`;
  }
  async updateNews() {
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json()
    this.props.setProgress(70);
    //console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updateNews();
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d26324be9ac3448c9ef23c92258b3270&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parsedData=await data.json()
    // console.log(parsedData);
    // this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults,loading:false})

  }
  handlePreviousClick = async () => {
    console.log("previous");
    await this.setState({ page: this.state.page - 1 })
    this.updateNews();
  }
  handleNextClick = async () => {
    console.log("next");
    // if(!(this.state.page+1>Math.ceil(this.state.totalResults/this.props.pageSize))){

    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d26324be9ac3448c9ef23c92258b3270&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data=await fetch(url);
    // let parsedData=await data.json()
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page+1,
    //   articles:parsedData.articles,
    //   loading:false
    // })
    //}
    await this.setState({ page: this.state.page + 1 })
    this.updateNews();
  }

  handleSearch = async () => {
    // Perform the search using the current searchQuery
    const url = `https://newsapi.org/v2/everything?q=${this.state.searchQuery}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  // Function to update search query in state
  handleSearchInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  fetchMoreData = async() => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    //console.log(parsedData);
    this.setState({
      articles :this.state.articles.concat(parsedData.articles),
       totalResults: parsedData.totalResults 
      })
  };

  render() {
    return (
      <>
       <div className="container mt-3">
          <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search news..." value={this.state.searchQuery} onChange={this.handleSearchInputChange}/>
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button" onClick={this.handleSearch}>Search </button>
            </div>
          </div>
        </div>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsDaily-Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description} imageUrl={element.urlToImage}
                  newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
          </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr;Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </>
    )
  }
}

export default News