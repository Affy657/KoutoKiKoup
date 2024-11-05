import Box from "@mui/material/Box";
import Loading from "../../assets/loading.svg";

const WaitLoading = () => {
    return (
        <Box sx={{
            maxWidth: '40vw',
            maxHeight: '40vh',
            width: 'auto',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            paddingBottom: '20px'
        }}>
            <img src={Loading} alt="Loading"/>
        </Box>
    );
}

export default WaitLoading;