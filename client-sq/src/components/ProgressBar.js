import React from "react";
import '../styles/App.css'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

function ProgressBar({ number, style, theme }) {

    const BorderLinearProgress = styled(LinearProgress)({
        height: window.innerHeight * 0.005,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: theme.palette.text.primary == "#3C435C"? "#d7ddfc" :"#3C435C"
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: theme.palette.primary.main,
        },
    });

    return (
        <>
            <BorderLinearProgress variant="determinate" value={number} style={style} />
        </>
    );
}

export default ProgressBar