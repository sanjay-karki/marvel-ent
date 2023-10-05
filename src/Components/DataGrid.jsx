import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { columns } from "../helpers/data";
import { Skeleton } from "@mui/material";
import { GetMainContext } from "../Contexts/MainContext";

const TabularData = (props) => {
  const { paginationModel, handlePaginationModelChange, handleRowClick } =
    props;
  const { allCharacters, isLoading, totalCharacters } = GetMainContext();

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton animation="wave" height={100} />
          <Skeleton animation="wave" height={200} />
          <Skeleton animation="wave" height={100} />
          <Skeleton animation="wave" height={200} />
          <Skeleton animation="wave" height={100} />
        </>
      ) : (
        (allCharacters || []).length > 0 && (
          <DataGrid
            rows={allCharacters}
            columns={columns}
            pageSize={20}
            pageSizeOptions={[20]}
            pagination
            loading={isLoading}
            rowCount={totalCharacters}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={handlePaginationModelChange}
            rowsPerPageOptions={[20]}
            rowHeight={200}
            getRowHeight={() => "auto"}
            onRowClick={handleRowClick}
            // disableRowSelectionOnClick
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#ED1D24",
                color: "white",
                fontSize: "1.25rem",
                borderRight: `1px solid white`,
                fontWeight: "700",
              },
              "& .MuiDataGrid-row": {
                cursor: "pointer",
              },
              "& .MuiDataGrid-cellContent": {
                fontSize: "1rem",
              },
              "& .MuiDataGrid-virtualScrollerRenderZone": {
                "& .MuiDataGrid-row": {
                  backgroundColor: "#000000",
                },
              },
              "& .MuiPagination-root": {
                backgroundColor: "#ED1D24",
                color: "white",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#000000",
                color: "white",
              },
            }}
          />
        )
      )}
    </>
  );
};

export default TabularData;
