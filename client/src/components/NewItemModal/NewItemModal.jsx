import React, {useState} from 'react';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { spacing } from '@material-ui/system';
import Button from '@material-ui/core/Button';
import ChipInput from 'material-ui-chip-input';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        
    },
    heading: {
        textAlign: 'center',
    },
    inputFields: {
        marginTop: '10px',
    },
    button: {
        marginTop: '10px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorChips: {
        label: "That is incorrect.",
        error: true, 
    }

  }))

export default function NewItemModal(props) {
    const classes = useStyles();
    const [startTime, changeStartTime] = useState(""); 
    const [endTime, changeEndTime] = useState("");
    const [taskDesc, changeTaskDesc] = useState(""); 
    const [chips, updateChips] = useState([]);
    const [modalOpen, closeModal] = useState(true);

    function handleAddChip(chip) {
        let tempChips = [...chips]
        tempChips.push(chip);
        updateChips(tempChips)
    }

    function handleDeleteChip(chip, index) {
        let tempChips = [...chips]
        tempChips = tempChips.splice(index, "");
        updateChips(tempChips);
    }

    function getStartText(e) {
        changeStartTime(e.target.value);
    }

    function getEndText(e) {
        changeEndTime(e.target.value);
    }

    function getTaskText(e) {
        changeTaskDesc(e.target.value);
    }

    return (
        <Container>
            <Modal open={modalOpen} className={classes.modal} onClose={() => {closeModal(false); props.handleClose()}}>
                <Grid container xs={8} direction="column" className={classes.paper}>
                    <Grid item className={classes.heading}>
                        <h3>Add a New Routine Item</h3>
                    </Grid>
                <Grid container direction="row" spacing={2} className={classes.inputFields}>
                    <Grid item>
                        <TextField 
                            value={startTime}
                            label="Start Time" 
                            type="time" 
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={getStartText}
                        />
                    </Grid>
                    <Grid item>
                        <TextField 
                        value = {endTime}
                        label="End Time" 
                        type="time" 
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={getEndText}
                        variant="outlined"/>
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            value = {taskDesc}
                            id="outlined-full-width"
                            label="Task Description"
                            placeholder="Enter a description of the task..."
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            onChange={getTaskText}
                        />
                    </Grid>
                    <Grid item>
                        <ChipInput className={classes.errorChips} variant="outlined" label="Goals Worked Towards" placeholder="Enter some goals that will be worked towards by achieving this task" value={chips} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip, index) => handleDeleteChip(chip, index)}/>
                    </Grid>
                </Grid>
                    <Grid container direction="row" spacing={2} className={classes.button}>
                        <Button variant="contained" color="primary" onClick={() => {props.addNewItem({'time': `${startTime}-${endTime}`, 'description': taskDesc, 'goals': [...chips]}); props.handleClose()}}>Add a new task</Button>
                    </Grid>
                </Grid>
            </Modal> 
        </Container>
    )
}

 
    