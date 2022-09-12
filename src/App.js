import React, {useCallback, useMemo, useState} from 'react';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {LicenseManager} from 'ag-grid-enterprise';

LicenseManager.setLicenseKey(
    '<license key>'
);

export const GridExample2 = () => {
    const containerStyle = useMemo(() => ({width: '100%', height: '500px'}), []);
    const gridStyle = useMemo(() => ({height: '100%', width: '100%'}), []);
    const [rowData, setRowData] = useState();
    const [columnDefs, setColumnDefs] = useState([
        {field: 'athlete', minWidth: 150},
        {field: 'age', minWidth: 50, filter: 'agNumberColumnFilter'},
        {field: 'country', width: 120},
        {field: 'year', width: 90},
        {field: 'date', width: 110},
        {field: 'sport', width: 110},
        {field: 'gold', width: 110},
        {field: 'silver', width: 110},
        {field: 'bronze', width: 110},
    ]);
    const defaultColDef = useMemo(() => {
        return {
            editable: true,
            sortable: true,
            flex: 1,
            minWidth: 100,
            filter: true,
            resizable: true,
        };
    }, []);

    const onGridReady = useCallback((params) => {
        fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
            .then((resp) => resp.json())
            .then((data) => setRowData(data.slice(0, 600)));
    }, []);

    return (
        <div style={containerStyle}>
            <h3>Hello !!</h3>
            <div style={gridStyle} className="ag-theme-alpine">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    ensureDomOrder={true}
                    suppressColumnVirtualisation={true}
                    suppressRowVirtualisation={true}
                    onGridReady={onGridReady}
                ></AgGridReact>
            </div>
        </div>
    );
};

export default GridExample2;
