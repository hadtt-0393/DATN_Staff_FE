import BrushIcon from "@mui/icons-material/Brush";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import DetailRoom from "./detail-room";
import { convertPrice } from "../../utils";
import { Room, ServiceRoom } from "../../models/room";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { axiosInstance } from "../../api/axios";
export interface RoomCardProps {
	room: Room;
	reFetch: () => void;
	serviceRoomSystem: ServiceRoom[];
}
export default function RoomCard({
	room,
	reFetch,
	serviceRoomSystem,
}: RoomCardProps) {
	const [open, setOpen] = useState(null);
	const [openDialog, setOpenDialog] = useState(false);
	const [openPopupDelete, setOpenPopupDelete] = useState(false);

	const handleOpenMenu = (e: any) => {
		setOpen(e.currentTarget);
	};
	const renderImg = (
		<Box
			component="img"
			src={room.image}
			sx={{
				top: 0,
				width: 1,
				height: 0.9,
				objectFit: "cover",
				position: "absolute",
				borderRadius:"10px"
			}}
		/>
	);

	const renderImg2 = (
		<Box
			component="img"
			src={room.image}
			sx={{
				top: 0,
				width: 1,
				height: 1,
				objectFit: "cover",
				position: "absolute",
				borderRadius:"10px"
			}}
		/>
	);

	const renderPrice = (
		<Typography color="black">
			{convertPrice(room.price)} VND/Đêm
		</Typography>
	);

	const renderAvailableRoom = (
		<Box>
			<Typography color="black">
				{convertPrice(room.quantityAvailable)}/
				{convertPrice(room.quantity)}
			</Typography>
		</Box>
	);

	const hanleClose = () => {
		setOpen(null);
	};

	const openFormEditRoom = () => {
		setOpen(null);
		setOpenDialog(true);
	};

	const openFormDeleteRoom = () => {
		setOpen(null);
		setOpenPopupDelete(true);
	};

	const handleDeleteRoom = async () => {
		setOpenPopupDelete(false);
		const res = await axiosInstance.delete(`/room/deleteRoomByStaff/${room._id}`)
		if (res.status === 200) {
			reFetch();
		}
	};

	return (
		<Card>
			<Box sx={{ pt: "80%", position: "relative" }}>
				<MoreVertIcon
					onClick={handleOpenMenu}
					sx={{
						zIndex: 9,
						top: 8,
						right: 8,
						position: "absolute",
						color: "white",
					}}
				/>
				{renderImg}
			</Box>

			<Popover
				open={!!open}
				anchorEl={open}
				onClose={hanleClose}
				anchorOrigin={{ vertical: "top", horizontal: "left" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				sx={{ width: 140 }}
			>
				<MenuItem onClick={openFormEditRoom}>
					<BrushIcon sx={{ fontSize: "20px", mr: 1.5 }} />
					Sửa
				</MenuItem>

				<MenuItem
					onClick={openFormDeleteRoom}
					sx={{ color: "error.main" }}
				>
					<DeleteOutlineIcon sx={{ fontSize: "20px", mr: 1.5 }} />
					Xóa
				</MenuItem>
			</Popover>

			<Stack
				spacing={2}
				sx={{ px: 3, pb:3 }}
			>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography
						variant="h6"
						noWrap
						overflow="hidden"
						textOverflow="ellipsis"
					>
						{room.roomType}
					</Typography>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="start"
				>
					<Box
						display="flex"
						gap={2}
					>
						<Typography> Giá phòng: </Typography>
						<Typography> {renderPrice}</Typography>
					</Box>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					justifyContent="start"
				>
					<Box
						display="flex"
						gap={2}
					>
						<Typography> Số lượng phòng trống: </Typography>
						<Typography> {renderAvailableRoom}</Typography>
					</Box>
				</Stack>
			</Stack>
			<Dialog
				fullWidth
				open={openPopupDelete}
				onClose={() => setOpenPopupDelete(false)}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"

			>
				<DialogTitle id="alert-dialog-title">
					{"Bạn có chắc chắn muốn xóa phòng này không?"}
				</DialogTitle>
				<DialogContent>
					<Card>
						<Box sx={{ pt: "60%", position: "relative" }}>
							{renderImg2}
						</Box>
						<Stack
							spacing={2}
							sx={{ p: 3 }}
						>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
							>
								<Typography
									variant="h6"
									noWrap
									overflow="hidden"
									textOverflow="ellipsis"
								>
									{room.roomType}
								</Typography>
							</Stack>

							<Stack
								direction="row"
								alignItems="center"
								justifyContent="start"
							>
								<Box
									display="flex"
									gap={2}
								>
									<Typography> Giá phòng: </Typography>
									<Typography> {renderPrice}</Typography>
								</Box>
							</Stack>

							<Stack
								direction="row"
								alignItems="center"
								justifyContent="start"
							>
								<Box
									display="flex"
									gap={2}
								>
									<Typography>
										{" "}
										Số lượng phòng trống:{" "}
									</Typography>
									<Typography>
										{" "}
										{renderAvailableRoom}
									</Typography>
								</Box>
							</Stack>
						</Stack>
					</Card>
				</DialogContent>
				<DialogActions>
					<Button variant="outlined" onClick={() => setOpenPopupDelete(false)} sx={{mr:"20px"}}>
						Hủy bỏ
					</Button>
					<Button
						variant="contained"
						onClick={handleDeleteRoom}
						autoFocus
						sx={{m:"10px"}}
					>
						Xác nhận
					</Button>
				</DialogActions>
			</Dialog>
			<DetailRoom
				isOpen={openDialog}
				onClose={() => setOpenDialog(false)}
				roomDetail={room}
				reFetch={reFetch}
				serviceRoomSystem={serviceRoomSystem}
			/>
		</Card>
	);
}