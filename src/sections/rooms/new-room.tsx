import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Theme, useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CreateRoom({ isOpen, onClose }: any) {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const theme = useTheme();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const services = [
        'Kitchen',
        'Private bathroom',
        'Air conditioning',
        'Bath',
        'Balcony',
        'Washing machine',
        'Patio',
        'View',
        'Sea view',
        'Coffee/tea maker',
        'Coffee machine',
        'Feather pillow',
        'Toilet with grab rails',
        'Hand sanitiser',
        'Quiet street view',
        'Clothes rack',
        'Radio',
        'Private apartment in building',
        'Outdoor furniture',
        'Free toiletries',
        'Iron',
        'Wireless Internet',
        'Tea/Coffee maker',
        'Toilet',
        'Toaster',
        'Terrace',
    ]

    function getStyles(name: string, personName: readonly string[], theme: Theme) {
        return {
            fontWeight:
                personName.indexOf(name) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleClose = () => {
        onClose()
    }

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <Dialog
            fullWidth={true}
            maxWidth="lg"
            open={isOpen}
        >
            <DialogTitle>Detail Room</DialogTitle>
            <Box sx={{ border: "1px solid #ccc", borderRadius: "10px", m: "10px 20px 10px 20px" }}>
                <Box display="flex" flexDirection="row" alignItems='center' marginLeft={2} >
                    <Box display='flex' flex={1} sx={{ mr: 2 }} flexDirection="column" justifyContent="flex-end" >
                        <img src='http://res.cloudinary.com/di7a7sbbn/image/upload/v1668413532/upload/w09wm8rwttlvyzxnhyro.jpg' style={{ borderRadius: "20px", marginTop: "20px" }} />
                        <Box sx={{ textAlign: "center" }}>
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<CloudUploadIcon />}
                                sx={{ mt: 2, mb: 2, backgroundColor: "#333", "&:hover": { backgroundColor: "#000" } }}
                                size='large'
                            >
                                Choose images
                                <VisuallyHiddenInput type="file" />
                            </Button>
                        </Box>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Stack spacing={2} flex={1} sx={{ margin: 2 }}>
                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Name:
                            </Typography>
                            <TextField id="outlined-basic" label="Name" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Type:
                            </Typography>
                            <TextField id="outlined-basic" label="Type" variant="outlined" sx={{ flex: 1 }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography
                                variant="subtitle1"
                                sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Price:
                            </Typography>
                            <TextField
                                id="outlined-start-adornment"
                                label="Price"
                                sx={{ flex: 1 }}
                                type='number'
                                inputProps={{ min: 0 }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">VND</InputAdornment>,
                                }} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Descriptions:
                            </Typography>
                            <TextField id="outlined-basic" label="Descriptions" variant="outlined" sx={{ flex: 1 }} multiline maxRows={4} />
                        </Stack>

                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Services:
                            </Typography>
                            <FormControl sx={{ flex: 1 }}>
                                <InputLabel id="demo-multiple-chip-label">Services</InputLabel>
                                <Select
                                    label="Service"
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput id="select-multiple-chip" label="Services" />}
                                    renderValue={(selected) => (
                                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}

                                >
                                    {services.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between" gap={3} alignItems="center">
                            <Typography variant="subtitle1" sx={{ color: 'text.disabled', flex: 0.4 }}>
                                Status
                            </Typography>
                            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center", flex: 1 }}>
                                <FormControlLabel control={<Switch defaultChecked />} label="Busy" />
                            </Box>
                        </Stack>
                    </Stack>
                </Box>
            </Box>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Close</Button>
                <Button variant='contained'>Save</Button>
            </DialogActions>
        </Dialog>
    )
}