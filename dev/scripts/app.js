import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './todo';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCCoZ70dEE9tMKY2PeocO-QUmwYKDFoFJo",
  authDomain: "med-app-a0062.firebaseapp.com",
  databaseURL: "https://med-app-a0062.firebaseio.com",
  projectId: "med-app-a0062",
  storageBucket: "",
  messagingSenderId: "39941681685"
};
firebase.initializeApp(config);


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      identity: "",
      mobile: "1800-callme-maybe?",
      doctor: "Dr.Luigi",
      emergency: "Cousin It",
      drugs: ["aspirin", "lipitor"],
      drug: "baby aspirin",
      dosage: "250mg"
    };
    this.handleChange = this.handleChange.bind(this);
    this.addDrug = this.addDrug.bind(this);
  }
      handleChange(e) {
        console.log(e.target.value)
        this.setState({
          [e.target.name]: e.target.value
        });
      }

      addDrug(e) {
        e.preventDefault();
      }
    render() {
      return (
        <div className="mainContainer wrapper">
          <header>
            <h1>Dr. Mario's Pill List</h1>
            <h2>Did you take your pill yet?</h2>
          </header>
          <main></main>


          <form action="" onSubmit={this.addDrug}>

          <div className="nameContainer wrapper">
            <label htmlFor=""></label>
            <input type="text" name="identity" placeholder="Name" value={this.state.identity} onChange={this.handleChange}/>
          </div>

          <div className="mobileContainer wrapper">
            <label htmlFor="">Mobile:</label>
              <input type="text" name="mobile" placeholder="" value={this.state.mobile} onChange={this.handleChange}/>
          </div>

          <div className="doctorContainer wrapper">
            <label htmlFor="">Doctor's contact:</label>
              <input type="text" name="doctor" placeholder="Doctor's contact" value={this.state.doctor} onChange={this.handleChange}/>
          </div>

          <div className="emergencyContainer wrapper">
            <label htmlFor="">Emergency contact:</label>
              <input type="text" name="emergency" placeholder="Emergency contact" value={this.state.emergency} onChange={this.handleChange}/>
          </div>

          <div className="pillContainer wrapper">
            <div>
              <label htmlFor="">Medication name:</label>
              <input type="text" name="medicine" value={this.state.drug} onChange={this.handleChange}/>
            </div>
            
            <div>
              <label htmlFor="">Dosage amount:</label>
                <input type="text" name="dosage" value={this.state.dosage} onChange={this.handleChange}/>
            </div>

            <div>
              <input type="submit" value="Add Medication"/>
            </div>
          </div>

          </form>

          <div>
            {/* {this.state.identity.map((identity) => {
              return <p>{identity}</p>
            })}  */}
          </div>

          <ul className="listContainer wrapper">
            {this.state.drugs.map((drug, i) => {
              return <li key={`drug-${i}`}>{drug}</li>
            })}
          </ul>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
