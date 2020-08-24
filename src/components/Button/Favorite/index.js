import React, {useState, useEffect} from 'react';
import {AntDesign} from '@expo/vector-icons';
import {Wrapper} from "./styles";
import {colors} from '../../../theme';

const Favorite = ({onPress}) => {

    const [click, setClick] = useState(false);

    function toggleClick() {
        setClick(!click)
    }


    return (
        <Wrapper onPress={toggleClick}>

        </Wrapper>
    );
};

export default Favorite;

