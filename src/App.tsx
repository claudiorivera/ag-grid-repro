import {
	AllCommunityModule,
	type ColDef,
	ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useMemo, useState } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

type DataType = {
	status: string;
	name: string;
	price: number;
	description: string;
};

export function App() {
	const [isLegacyApi, setIsLegacyApi] = useState(true);

	const legacyColumnDefs = useMemo<ColDef<DataType>[]>(
		() => [
			{
				field: "status",
				pinned: "left",
				cellRenderer: StatusCellRenderer,
				headerCheckboxSelection: true,
				checkboxSelection: true,
			},
			{ field: "name" },
			{ field: "price" },
			{ field: "description" },
		],
		[],
	);

	const newColumnDefs = useMemo<ColDef<DataType>[]>(
		() => [
			{
				field: "status",
				pinned: "left",
				cellRenderer: StatusCellRenderer,
			},
			{ field: "name" },
			{ field: "price" },
			{ field: "description" },
		],
		[],
	);

	const rowData = useMemo<DataType[]>(
		() => [
			{
				status: "in_stock",
				name: "Product 1",
				price: 19.99,
				description: "lorem ipsum dolor",
			},
			{
				status: "out_of_stock",
				name: "Product 2",
				price: 29.99,
				description: "lorem ipsum dolor",
			},
			{
				status: "in_stock",
				name: "Product 3",
				price: 39.99,
				description: "lorem ipsum dolor",
			},
			{
				status: "discontinued",
				name: "Product 4",
				price: 49.99,
				description: "lorem ipsum dolor",
			},
		],
		[],
	);

	return (
		<div
			style={{
				width: "50vw",
				height: "50vh",
				marginInline: "auto",
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}
		>
			<button type="button" onClick={() => setIsLegacyApi((prev) => !prev)}>
				{isLegacyApi
					? "Legacy API (click to toggle)"
					: "New API (click to toggle)"}
			</button>

			<AgGridReact
				rowData={rowData}
				columnDefs={isLegacyApi ? legacyColumnDefs : newColumnDefs}
				defaultColDef={{
					flex: 1,
				}}
				rowSelection={
					isLegacyApi
						? "multiple"
						: {
								mode: "multiRow",
								checkboxes: true,
								headerCheckbox: true,
							}
				}
				initialState={
					isLegacyApi
						? undefined
						: {
								partialColumnState: true,
								columnOrder: {
									orderedColIds: [
										"ag-Grid-AutoColumn",
										"ag-Grid-SelectionColumn",
										"status",
										"name",
										"price",
										"description",
									],
								},
							}
				}
			/>
		</div>
	);
}

function StatusCellRenderer() {
	return <MyCustomComponent />;
}

function MyCustomComponent() {
	return <button type="button">⚙️</button>;
}
