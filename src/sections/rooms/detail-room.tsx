import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Theme, styled, useTheme } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";
import axiosInstance from "../../api/axios";
import { REACT_APP_CLOUDINARY_ENDPOINT } from "../../constant";
import { Room } from "../../models/room";

export default function DetailRoom({
    isOpen,
    onClose,
    roomDetail,
    reFetch,
    serviceRoomSystem,
}: any) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const theme = useTheme();
    function getStyles(
        name: string,
        personName: readonly string[],
        theme: Theme
    ) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const VisuallyHiddenInput = styled("input")({
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        height: 1,
        overflow: "hidden",
        position: "absolute",
        bottom: 0,
        left: 0,
        whiteSpace: "nowrap",
        width: 1,
    });

    const [room, setRoom] = useState<Partial<Room>>(roomDetail);
    const [file, setfile] = useState<any>(null);

    const handleChange = (event: any) => {
        handleChangeRoom({ serviceIds: event.target.value });
    };
    const handleClose = () => {
        onClose();
        // reFetch();
    };
    const handleChangeRoom = (values: Partial<Room>) => {
        setRoom({
            ...room,
            ...values,
        });
    };
    const handleChangeFile = (e: any) => {
        setfile(e.target.files[0]);
    };
    const uploadImg = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "stndhxae");
        const res = await axios.post(REACT_APP_CLOUDINARY_ENDPOINT, formData);
        return res.data.url;
    };
    const save = () => {
        const saveRoom = async () => {
            let url: string | undefined = undefined;
            let roomD;
            if (file) {
                url = await uploadImg(file);
            }
            if (!url) {
                roomD = { ...room };
            } else {
                roomD = { ...room, image: url };
            }
            handleChangeRoom({
                image: url,
            });
            await axiosInstance.put(
                `/room/updateRoomByStaff/${room._id}`,
                roomD
            );
            reFetch();
            handleClose();
        };
        saveRoom();
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isOpen}
        >
            <DialogTitle>Chi tiết phòng</DialogTitle>
            <Box
                sx={{
                    border: "1px solid #ccc",
                    borderRadius: "10px",
                    m: "10px 20px 10px 20px",
                }}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    marginLeft={2}
                >
                    <Box
                        display="flex"
                        flex={1}
                        sx={{ mr: 2 }}
                        flexDirection="column"
                        justifyContent="flex-end"
                    >
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file as any)
                                    : room.image
                            }
                            style={{ borderRadius: "20px", marginTop: "20px", maxWidth: "500px", maxHeight: "500px", objectFit: "contain" }}
                        />
                        <Box sx={{ textAlign: "center" }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: "#333",
                                    "&:hover": { backgroundColor: "#000" },
                                }}
                                size="large"
                            >
                                Chọn ảnh
                                <VisuallyHiddenInput
                                    type="file"
                                    onChange={handleChangeFile}
                                />
                            </Button>
                        </Box>
                    </Box>
                    <Divider
                        orientation="vertical"
                        flexItem
                    />
                    <Stack
                        spacing={2}
                        flex={1}
                        sx={{ margin: 2 }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Loại phòng:
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Tên phòng"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                value={room.roomType}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        roomType: e.target.value,
                                    })
                                }
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Số lượng phòng:
                            </Typography>
                            <TextField
                                label="Số lượng"
                                id="outlined-start-adornment"
                                sx={{ flex: 1 }}
                                type="number"
                                inputProps={{ min: 0 }}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        quantity: +e.target.value,
                                    })
                                }
                                value={room.quantity}
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Giá:
                            </Typography>
                            <TextField
                                id="outlined-start-adornment"
                                label="Giá"
                                sx={{ flex: 1 }}
                                type="number"
                                inputProps={{ min: 0 }}
                                value={room.price}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            VND
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) =>
                                    handleChangeRoom({ price: +e.target.value })
                                }
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Số lượng người tối đa:
                            </Typography>
                            <TextField
                                id="outlined-start-adornment"
                                label="Số lượng người tối đa"
                                sx={{ flex: 1 }}
                                type="number"
                                inputProps={{ min: 0 }}
                                value={room.maxPeople}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        maxPeople: +e.target.value,
                                    })
                                }
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Mô tả:
                            </Typography>
                            <TextField
                                id="outlined-basic"
                                label="Mô tả"
                                variant="outlined"
                                sx={{ flex: 1 }}
                                multiline
                                maxRows={4}
                                value={room.description}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        description: e.target.value,
                                    })
                                }
                            />
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Dịch vụ:
                            </Typography>
                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel id="demo-multiple-chip-label">
                                    Dịch vụ
                                </InputLabel>
                                <Select
                                    label="Service"
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={room.serviceIds}
                                    onChange={handleChange}
                                    input={
                                        <OutlinedInput
                                            id="select-multiple-chip"
                                            label="Dịch vụ"
                                        />
                                    }
                                    renderValue={(serviceIds) => {
                                        return (
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexWrap: "wrap",
                                                    gap: 0.5,
                                                }}
                                            >
                                                {serviceIds.map(
                                                    (serviceId: any) => {
                                                        let service =
                                                            serviceRoomSystem.find(
                                                                (
                                                                    service: any
                                                                ) =>
                                                                    serviceId ===
                                                                    service._id
                                                            ) as any;
                                                        return (
                                                            <Chip
                                                                key={
                                                                    service._id
                                                                }
                                                                label={
                                                                    service.serviceName
                                                                }
                                                            />
                                                        );
                                                    }
                                                )}
                                            </Box>
                                        );
                                    }}
                                    MenuProps={MenuProps}
                                >
                                    {serviceRoomSystem.map((service: any) => (
                                        <MenuItem
                                            key={service._id}
                                            value={service._id}
                                            style={getStyles(
                                                service._id,
                                                room.serviceIds || [],
                                                theme
                                            )}
                                        >
                                            {service.serviceName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            gap={3}
                            alignItems="center"
                        >
                            <Typography
                                variant="subtitle1"
                                sx={{ color: "text.disabled", flex: 0.4 }}
                            >
                                Số phòng trống
                            </Typography>
                            <TextField
                                label="Số lượng"
                                id="outlined-start-adornment"
                                sx={{ flex: 1 }}
                                type="number"
                                inputProps={{ min: 0 }}
                                onChange={(e) =>
                                    handleChangeRoom({
                                        quantity: +e.target.value,
                                    })
                                }
                                value={room.quantityAvailable}
                                disabled={true}
                            />
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={handleClose}
                >
                    Hủy
                </Button>
                <Button
                    variant="contained"
                    onClick={save}
                >
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
}