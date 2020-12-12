import { useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

export const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '10rem',
  },
  filtersContainer: {},
  formControl: {
    minWidth: 170,
    maxWidth: 300,
    backgroundColor: 'white',
    boxShadow: '0 5px 10px rgba(154,160,185,.12), 0 15px 40px rgba(166,173,201,.22)',
    borderRadius: '1.2rem',
    padding: '0.6rem 1rem',
    '& > div': {
      margin: '0 !important',
    },
  },
  inputLabelText: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.4rem',
    fontWeight: 500,
    transform: 'translate(1.8rem, 1.2rem)',
    color: theme.palette.primary.main,
  },
  selectIcon: {
    fontSize: '2.8rem',
    transform: 'translate(1rem, -0.2rem)',
    color: theme.palette.primary.main,
  },
}));

const names = ['Human', 'Mouse', 'Rat', 'Bovin'];

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
};

const ExperimentsTable = () => {
  const classes = useStyles();

  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedNames(e.target.value as string[]);
  };

  return (
    <section className={classes.container}>
      <div className={classes.filtersContainer}>
        <FormControl className={classes.formControl}>
          <InputLabel id='species-checkbox-label' className={classes.inputLabelText}>
            Species
          </InputLabel>
          <Select
            disableUnderline
            variant='filled'
            labelId='species-checkbox-label'
            value={selectedNames}
            onChange={handleChange}
            input={<Input />}
            multiline
            renderValue={(selected) => (selected as string[]).join(', ')}
            MenuProps={MenuProps}
            classes={{ icon: classes.selectIcon }}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={selectedNames.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </section>
  );
};

export default ExperimentsTable;
