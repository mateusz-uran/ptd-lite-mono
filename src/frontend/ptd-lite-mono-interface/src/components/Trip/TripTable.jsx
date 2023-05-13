import { Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import useTripService from "../../api/TripService/TripServiceHook";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function TripTable(props) {
    const { t } = useTranslation();
    const { cardId, cardTrips } = props;

    const { deleteManyTrips } = useTripService();

    const [trips, setTrips] = useState(cardTrips);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [selected, setSelected] = useState([]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = trips.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (tripId) => selected.indexOf(tripId) !== -1;

    const handleDeleteSelectedTrips = () => {
        deleteManyTrips(selected)
            .then(() => {
                setTrips((prevTrips) =>
                    prevTrips.filter((trip) => !selected.includes(trip.id))
                );
                // Clear the selected state to reflect the successful delete
                setSelected([]);
            })
    }

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - trips.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => {
        setSelected([]);

    }, [cardId])
    return (
        <div>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <IconButton
                                    disabled={selected.length <= 0}
                                    edge="start"
                                    onClick={() => handleDeleteSelectedTrips()}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell align="center" colSpan={5} sx={{borderLeft: 1}}>
                                {t('misc.start')}
                            </TableCell>
                            <TableCell align="center" colSpan={5} sx={{borderLeft: 1, borderRight: 1}}>
                                {t('misc.end')}
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    color="primary"
                                    onClick={(event) => handleSelectAllClick(event)}
                                />
                            </TableCell>
                            <TableCell>{t('tripTable.day')}</TableCell>
                            <TableCell>{t('tripTable.hour')}</TableCell>
                            <TableCell>{t('tripTable.location')}</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>{t('tripTable.counter')}</TableCell>
                            <TableCell>{t('tripTable.day')}</TableCell>
                            <TableCell>{t('tripTable.hour')}</TableCell>
                            <TableCell>{t('tripTable.location')}</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>{t('tripTable.counter')}</TableCell>
                            <TableCell>{t('tripTable.mileage')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? trips.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : trips
                        ).map((row) => {
                            const isItemSelected = isSelected(row.id);
                            return (
                                <TableRow key={row.id} hover onClick={(event) => handleClick(event, row.id)} >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            checked={isItemSelected}
                                        />
                                    </TableCell>
                                    <TableCell>{row.dayStart}</TableCell>
                                    <TableCell>{row.hourStart}</TableCell>
                                    <TableCell>{row.locationStart}</TableCell>
                                    <TableCell>{row.countryStart}</TableCell>
                                    <TableCell>{row.counterStart}</TableCell>
                                    <TableCell>{row.dayEnd}</TableCell>
                                    <TableCell>{row.hourEnd}</TableCell>
                                    <TableCell>{row.locationEnd}</TableCell>
                                    <TableCell>{row.countryEnd}</TableCell>
                                    <TableCell>{row.counterEnd}</TableCell>
                                    <TableCell>{row.carMileage}</TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={11} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: t('tripTable.paginationLabel'), value: -1 }]}
                                colSpan={11}
                                count={trips.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                labelRowsPerPage={t('tripTable.paginationRowsPerPageLabel')}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}

export default TripTable;