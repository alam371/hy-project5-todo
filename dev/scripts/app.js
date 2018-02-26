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
      mobile: "",
      doctor: "",
      emergency: "",
      medicine: "",
      dosage: "",
      drugs: [{medication:"xyz", dosage: "abc mg", completed: false}]
    };
    this.handleChange = this.handleChange.bind(this);
    this.addDrug = this.addDrug.bind(this);
    this.removeDrug = this.removeDrug.bind(this);
    this.drugTaken = this.drugTaken.bind(this);
  }

  handleChange(e) {
    // Be sure to bind this function or else it won't work!
    console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // Here we are displaying all the stored data that
  // the user inputs from Firebase.
  componentDidMount() {
    const dbRef = firebase.database().ref('/drugs');
    dbRef.on('value', (snapshot) => {
      // console.log(snapshot.val());
      const info = snapshot.val();
      const state = [];
      for(let key in info) {
        info [key].key = key;
        state.push(info[key]);
      }
      console.log(state);
      this.setState({
        drugs: state
      });
    });
  }

  addDrug(e) {
    e.preventDefault();
    // Be sure to bind this function or else it won't work!
    // Make a variable to make a create a new array.
    const drug = {
      medication: this.state.medicine,
      dosage: this.state.dosage,
      completed: false
    };
    
    // Make a variable to take the old array and add new item to the new array.
    // Have to set state for the newArray.
    // Here is the function that display user input in state.
    let listofDrugs = Array.from(this.state.drugs);
    console.log(listofDrugs);
    listofDrugs.push(drug);
    this.setState({
      drugs: listofDrugs
    });
    
    // Here is the fucntion that saves the user input in firebase.
    const dbRef = firebase.database().ref('/drugs');
    dbRef.push(drug);
    this.setState({
      name: '',
      drug: ''
    });
  }

  removeDrug(e) {
    // console.log(e.target.dataset);
    // Be sure to bind this function or else it won't work!
    // console.log("pressed");
    const drugState = Array.from(this.state.drugs);
    const drugToRemoveKey = drugState[e.target.dataset.drugindex].key;
    drugState.splice(e.target.dataset.drugindex,1);
    this.setState({
      drugs: drugState,
    });

    const dbref = firebase.database().ref(`/drugs/${drugToRemoveKey}`);
    dbref.remove();
    // const drugTook = Array.from(this.state.drugs);
    // drugTook.splice(e.target.dataset)
  }

  // make a variable call drugToUpdate
  // pass a function that uses the key identifier
  // locate the key and then return the result 
  // pass it through conditions 
  // if the drug to be updated = drug to be updated then delete the key
  drugTaken(e) {
    console.log(e.target.dataset);
    
    // let drugToUpdate = this.state.drugs[e.target.dataset.drugindex];
    // console.log(drugToUpdate);
    // drugToUpdate.completed = true;
    let updatedDrugList = Array.from(this.state.drugs);
    updatedDrugList[e.target.dataset.drugindex].completed = true;
    const drugToUpdate = updatedDrugList[e.target.dataset.drugindex];
    console.log(updatedDrugList);
    console.log(drugToUpdate);
    this.setState({
      drugs: updatedDrugList
    });
    
    const dbref = firebase.database().ref(`/drugs/${drugToUpdate.key}`);
    // drugToUpdate.taken = drugToUpdate.taken === 
    // true ?
    // false : true;
    // delete drugToUpdate.key;
    dbref.set(drugToUpdate);
  }

    render() {
      return (
        <div className="mainContainer wrapper">
          <header>
            <h1>Pill Minder</h1>
          </header>
          <main></main>

          {/* onSubmit of the form, a drug is added to the <li> of drugs. */}
          <form action="" onSubmit={this.addDrug}>

          {/* User add name */}
          <div className="nameContainer wrapper">
            <label htmlFor=""></label>
            <input type="text" name="identity" placeholder="Name" value={this.state.identity} onChange={this.handleChange}/>
          </div>

          {/* User add phone number */}
          <div className="mobileContainer wrapper">
            <label htmlFor=""></label>
              <input type="text" name="mobile" placeholder="Mobile" value={this.state.mobile} onChange={this.handleChange}/>
          </div>

          {/* User add Doctor name */}
          <div className="doctorContainer wrapper">
            <label htmlFor=""></label>
              <input type="text" name="doctor" placeholder="Doctor's contact" value={this.state.doctor} onChange={this.handleChange}/>
          </div>

          {/* User add emergency contact */}
          <div className="emergencyContainer wrapper">
            <label htmlFor=""></label>
              <input type="text" name="emergency" placeholder="Emergency contact" value={this.state.emergency} onChange={this.handleChange}/>
          </div>

          <div className="pillContainer wrapper">
            <div>
              {/* User add drug to <li> */}
              <label htmlFor=""></label>
              <input type="text" name="medicine" placeholder="Medication name" value={this.state.medicine} onChange={this.handleChange} remove={this.removeDrug}/>
            </div>
            
            <div>
              {/* User add dosage to <li> */}
              <label htmlFor=""></label>
              <input type="text" name="dosage" placeholder="Dosage" value={this.state.dosage} onChange={this.handleChange}/>
            </div>

            <div>
              <input type="submit" value="Add medication!"/>
            </div>
          </div>

          </form>

          <ul className="listContainer wrapper">

            {this.state.drugs.map((drug, i) => {
              console.log(drug);
              return ( <DrugItem data={drug} key={`drug-${i}`} remove={this.removeDrug} drugIndex={i} drugTaken={this.drugTaken} />
            )
            })}
          </ul>
        </div>
      )
    }
  }  
      const DrugItem = (props) => {
        // console.log(props.data.medication);
        // console.log(props.data.dosage);
        return (
          <li>{props.data.medication}-{props.data.dosage} <button data-drugIndex={props.drugIndex} onClick={props.drugTaken}>drug taken</button> <button data-drugIndex={props.drugIndex} onClick={props.remove}>delete drug from list</button>
          </li>
        )
      }


ReactDOM.render(<App />, document.getElementById('app'));
