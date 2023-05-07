import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewAgencies.css";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

const background = require('../../assets/images/bg.jpg');
const defaultImg = require('../../assets/images/default.jpg');
const randomImages = [
  require('../../assets/images/1.jpg'),
  require('../../assets/images/2.jpg'),
  require('../../assets/images/3.jpg'),
  require('../../assets/images/4.jpg'),
  require('../../assets/images/5.jpg'),
];

export default function ViewAgencies() {
  const [agencies, setAgencies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get("http://localhost:5000/Agency").then((res) => {
      setAgencies(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAgencies = agencies.filter((val) => {
    if (searchTerm === "") {
        return val;
    } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
    }
    else if (val.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
    }
  });

  return (
    <div className="bg" >
      <Navbar style={{position: 'fixed', zIndex: '9999'}}/>
      <div className="bg-image" style={{backgroundImage: `url(${background})` }}></div>
      
      <div className="container1">
        
        <div className="center1">
          <br/>
          <h1>Travel Agencies</h1>
        </div>
        <div className="center2">
        <TextField
            label="Search for an agency"
            variant="outlined"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="row1">
          {filteredAgencies.map((agency, index) => (
            <div key={agency._id} className="col-md-4">
              <Card className="mmm">
                <CardContent>
                  <img src={randomImages[index % 5] || defaultImg} alt="agency" style={{width: '100%'}} />
                  <Typography variant="h5" component="h2">
                    {agency.name}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {agency.location}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    <strong>Email:</strong> {agency.email}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    <strong>Contact No:</strong> {agency.contactNo}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    <strong>Description:</strong> {agency.Description}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <br/>
      </div>
      <Footer/>
    </div>
  );
}
