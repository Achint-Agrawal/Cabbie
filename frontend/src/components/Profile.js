import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
} from "@mui/material";
import Rating from "@mui/material/Rating";

// const user = {
//     avatar: "/static/images/avatars/avatar_6.png",
//     city: "Los Angeles",
//     country: "USA",
//     jobTitle: "Senior Developer",
//     name: "Katarina Smith",
//     timezone: "GTM-7",
// };

// name: { type: String },
//     contact: { type: String },
//     email: { type: String, required: [true, "email should be valid"] },
//     password: { type: String },
//     address: { type: String },
//     image_url: { type: String },
//     rating: { type: Number },

// const user = {
//     name: "Daljit",

// }

const user = {
    name: "Priydarshi Singh",
    image: "/Priydarshi.png",
    rating: 1.2,
    contact: "7888817907",
    email: "dryairship@gmail.com",
};

export default function Profile() {
    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        alignItems: "center",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Avatar
                        src={user.image}
                        sx={{
                            height: 100,
                            mb: 2,
                            width: 100,
                        }}
                    />
                    <Typography color="textPrimary" gutterBottom variant="h5">
                        {user.name}
                    </Typography>
                    <Rating
                        readOnly="true"
                        value={user.rating}
                        precision={0.1}
                    />
                    <Typography color="#fcba03">
                        {"(" + user.rating + ")"}
                    </Typography>
                    <Typography mt={2} display="inline" fontWeight={"bold"}>
                        {"Phone No: "}
                    </Typography>
                    <Typography display="inline">{user.contact}</Typography>
                    <br />
                    <Typography display="inline" fontWeight={"bold"}>
                        {"Email: "}
                    </Typography>
                    <Typography display="inline">{user.email}</Typography>{" "}
                </Box>
            </CardContent>
            {/* <Divider /> 
            <CardActions>
                <Button color="primary" fullWidth variant="text">
                    Upload picture
                </Button>
            </CardActions> */}
        </Card>
    );
}
