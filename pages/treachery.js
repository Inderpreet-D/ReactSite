import { useState } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import axios from "axios";

import Page from "../components/Page";
import Main from "../containers/Treachery/Main";
import Room from "../containers/Treachery/Room";
import Card from "../containers/Treachery/Card";

const useStyles = makeStyles((theme) => ({
    root: {
        "& > *": {
            margin: theme.spacing(1),
        },
        margin: "0 auto",
        width: "50%",
        textAlign: "center",
    },
}));

const STATES = {
    Main: 0,
    Room: 1,
    Card: 2,
};

const Treachery = () => {
    const classes = useStyles();
    const [state, setState] = useState(STATES.Main);
    const [roomCode, setRoomCode] = useState("");
    const [numPlayers, setNumPlayers] = useState(0);
    const [roomSize, setRoomSize] = useState(-1);
    const [role, setRole] = useState("");
    const [imgSrc, setImgSrc] = useState("/favicon.ico");
    const [winCondition, setWinCondition] = useState("");

    const onJoinHandler = (roomCode) => {
        console.log(`Trying to join ${roomCode}`);
        axios.get(`/api/treachery?roomCode=${roomCode}`).then((res) => {
            console.log(res.data);
        });
    };

    const onCreateHandler = (numPlayers, rarity) => {
        console.log(`Building room for ${numPlayers} with rarity of ${rarity}`);
    };

    let page;
    switch (state) {
        case STATES.Main:
            page = (
                <Main
                    onJoin={onJoinHandler}
                    onCreate={onCreateHandler}
                    forwardClasses={classes}
                />
            );
            break;
        case STATES.Room:
            page = (
                <Room
                    roomCode={roomCode}
                    numPlayers={numPlayers}
                    roomSize={roomSize}
                />
            );
            break;
        case STATES.Card:
            page = (
                <Card role={role} imgSrc={imgSrc} winCondition={winCondition} />
            );
            break;
        default:
            page = <h1>Something went wrong!</h1>;
    }

    return (
        <Page title="Treachery">
            <div style={{ textAlign: "center" }}>
                <h1>MTG Treachery</h1>
            </div>
            <Paper variant="outlined" className={classes.root}>
                {page}
            </Paper>
        </Page>
    );
};

export default Treachery;
