import { Slider } from '../Slider/Slider';
import {
    Wrapper,
    LabelContainer,
    Name,
    Value,
} from "./Sliders.styled";



export const Sliders = (props) => {

    const handleChangeStorage = (newValue) => {
        props.onChangeStorage(newValue);
    };
  
    const handleChangeTransfer = (newValue) => {
        props.onChangeTransfer(newValue);
    };

    return (
        <Wrapper>
            <LabelContainer>
                <Name>
                    Storage:
                </Name>
                <Value>
                    {`${props.storage} GB`}
               </Value>
            </LabelContainer>
            <Slider onChange={handleChangeStorage} value={props.storage} />
            <LabelContainer>
                <Name>
                    Transfer:
                </Name>
                <Value>
                    {`${props.transfer} GB`}
               </Value>
            </LabelContainer>
            <Slider onChange={handleChangeTransfer} value={props.transfer}/>
        </Wrapper>
    )
}



