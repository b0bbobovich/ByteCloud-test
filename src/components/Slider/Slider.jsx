import {Slider as MUISlider} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Input } from './Slider.styled';


export const Slider = (props) => {
  let value = props.value;
  const marks = [
    {
      value: 0,
      label: '0 GB',
    },
    {
      value: 1000,
      label: '1000 GB',
    },
  ];
  
  const handleSliderChange = (event, value) => {
    props.onChange(value);
  };
  
  const handleInputChange = (event) => {
    props.onChange(event.target.value === '' ? '' : Number(event.target.value));
  };
  
  const handleBlur = () => {
    if (value < 0) {
      value = 0;
    } else if (value > 1000) {
      value = 1000;
    }
  };
  

    return (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
          <MUISlider
            key={`slider-${value}`}
            defaultValue={typeof value === 'number' ? value : 0}
            onChangeCommitted={handleSliderChange}
            aria-labelledby="input-slider"
            step={1}
            min={0}
            max={1000}
            valueLabelDisplay="auto"
            marks={marks}
            />
          </Grid>
          <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 1000,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
          </Grid>
        </Grid>

    )
}