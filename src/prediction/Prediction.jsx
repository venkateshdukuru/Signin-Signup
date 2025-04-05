import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, Select, MenuItem, Button, Typography, Grid, Card, CardContent, } from "@mui/material";

const Prediction = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    GADE_Generalized_Anxiety_disorder: "",
    SWL_Satisfaction_of_work_life: "",
    Game: "",
    Platform: "",
    Hours: "",
    earnings: "",
    whyplay: "",
    Gender: "",
    Age: "",
    Work: "",
    Degree: "",
    Birthplace: "",
    Residence: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);
      setMessage(response.ok ? `Prediction: ${data["Anxiety Category"]} - ${data["Recommendation"]}` : `Error: ${JSON.stringify(data)}`);
    } catch (error) {
      setLoading(false);
      setMessage("⚠️ Failed to connect to the server. Check if FastAPI is running.");
    }
  };
  const options = {
    GADE_Generalized_Anxiety_disorder: ["Not difficult at all", "Somewhat difficult", "Very difficult", "NA", "Extremely difficult"],
    SWL_Satisfaction_of_work_life: ["1", "2", "3", "4", "5", "6", "7"],
    Game: ["Skyrim", "Other", "World of Warcraft", "League of Legends", "Starcraft 2", "Counter Strike", "Destiny", "Diablo 3", "Heroes of the Storm", "Hearthstone", "Guild Wars 2"],
    Platform: ["Console (PS, Xbox, ...)", "PC", "Smartphone / Tablet", "Other"],
    Hours: ["0", "4", "8", "15", "20"],
    earnings: ["I play for fun", "I play mostly for fun but earn a little on the side", "for fun and to get better", "I intend to do both if I become good enough at some point.", "for fun and improvement", "i play for fun atm, but i pretend to earn a little by streaming.", "I earn a living by playing this game", "Escapism", "I play to try and get to the point of making money.", "I play to escape life", "Want to be a shoutcaster", "Other"],
    whyplay: ["To escape from reality", "To socialize with friends", "To improve my skills", "To relax and unwind", "To compete and win", "To explore new worlds", "To experience a story", "Other"],
    Gender: ["Male", "Female", "Other"],
    Age: ["10", "20", "30", "40", "50", "60", "70", "80"],
    Work: ["Unemployed / between jobs", "Employed", "Student at college / university", "Student at school", "NA", "Other"],
    Degree: ["Bachelor (or equivalent)", "High school diploma (or equivalent)", "Ph.D., Psy. D., MD (or equivalent)", "Master (or equivalent)", "None", "Other"],
    Birthplace: ["USA", "Germany", "Finland", "Canada", "Australia", "UK", "Other"],
    Residence: ["USA", "Germany", "South Korea", "Japan", "Finland", "Canada", "Australia", "UK", "Other"],
  };


  return (

    <>
      <Grid container>
        <Grid size={9}>
          <Typography  gutterBottom sx={{fontSize:'26px',fontWeight:600}} >Anxiety Prediction</Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} rowGap={3} mt={3}>
              {Object.keys(formData).map((key) => (
                <Grid item sx={6} key={key}>
                  <FormControl fullWidth sx={{ minWidth: 300 }}>
                    <InputLabel>{key.replace(/_/g, " ")}</InputLabel>
                    <Select name={key} value={formData[key]} onChange={handleChange} required label={key.replace(/_/g, " ")}>
                      <MenuItem value="">Select</MenuItem>
                      {options[key]?.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </Grid>

            <Grid container justifyContent="center">
              <Grid item xs={12} sm={3} textAlign="center">
                <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading} sx={{ mt: 2 }}>
                  {loading ? "Predicting..." : "Predict Anxiety"}
                </Button>
              </Grid>
            </Grid>

          </form>
        </Grid>
        <Grid size={3} mt={7}>
          <Card>
            <CardContent>
            <Typography  sx={{fontSize:'18px',fontWeight:600}}>
              Results of  Anxiety Prediction
              </Typography>

              <Typography sx={{fontSize:'16px'}} mt={2}>
                {message || "No records found"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>

  );
};

export default Prediction;
