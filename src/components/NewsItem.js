import React, { Component } from 'react'

export class NewsItem extends Component {
  

  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>
        <span className="badge rounded-pill bg-danger" >{source}</span></div>
      <img src={!imageUrl?"https://cdn.vox-cdn.com/thumbor/dFDl6EcIGxvqgYabdEPxrd1w3QQ=/0x0:3000x2000/1200x628/filters:focal(1500x1000:1501x1001)/cdn.vox-cdn.com/uploads/chorus_asset/file/23925967/acastro_STK045_02.jpg":imageUrl}className="card-img-top" alt="..."/>
      <div className="card-body">
        <h5 className="card-title">{title} </h5>
        <p className="card-text">{description===null ||description.length===0?"Description not available":description.slice(0,100)+"..."}</p>
        <p className="card-text"><small className="text-body-secondary">By{!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} targer="_blank" className="btn btn-sm btn-dark">Read More</a>
      </div>
    </div>
    </div>
    )
  }
}

export default NewsItem