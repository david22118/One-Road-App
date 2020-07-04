import React, { useState } from "react";
import { observer, inject } from "mobx-react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import AnalyticsResults from './AnalyticsResults'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
const Analytics = inject(
  "users",
  "rides"
)(
  observer((props) => {
    const classes = useStyles();
    const toSqlDate = (date) => (new Date(date)).toISOString().slice(0, 19).replace('T', ' ')
    const [chosenDate, setChosenDate] = useState({userId:'', from: "2020-07-08T10:30",to:"2020-07-08T10:30"});
    const [analytics,setAnalytics]=useState([])
    const handleChange = (e) => {
    const name = e.target.name;
    setChosenDate({ ...chosenDate, [name]: e.target.value });
  
    }
    console.log(toSqlDate(chosenDate.from))
    const handelClick = async() => {
    const backAnalytics =  await props.users.analyticsSearch(chosenDate.userId,toSqlDate(chosenDate.from),toSqlDate(chosenDate.to))
    setAnalytics([...backAnalytics])
      }
    
  console.log(chosenDate)

    return (
      <div>
         <TextField
          id="outlined-textarea"
          label="Userid"
          placeholder="Placeholder"
          multiline
          variant="outlined"
          value={chosenDate.userId}
          name="userId"
          onChange={handleChange}
        />
       <TextField
        id="datetime-local"
        label="From"
        type="datetime-local"
        name="from"
        defaultValue={chosenDate.from}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
   
         <TextField
        id="datetime-local"
        label="To"
        type="datetime-local"
        name="to"
        defaultValue={chosenDate.to}
        onChange={handleChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
       
        <Button onClick={handelClick} variant="contained" color="primary">Search</Button>
        {analytics.map(a=><AnalyticsResults key={chosenDate.userId} income={a.income} expense={a.expense} ridesJoined={a.ridesJoined} carpools={a.carpools} />)}

      </div>
    );
  })
);

export default Analytics;