import React, { useState, useEffect, useRef } from "react";
import { useHeading } from "./../../../../context/HeadingContext";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import "./post.css";
import { Link } from "react-router-dom";

const Posts = () => {
  const { setHeading } = useHeading();
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [error, setError] = useState<string | null>(null);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]); // Updated to match allPosts type
  const [rowClick, setRowClick] = useState(true);
  const dt = useRef<any>(null); // Declare and initialize the dt ref
  const toast = useRef<any>(null);
  const [visible, setVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null); // State to store selected post details

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setAllPosts(response.data);
      setError(null);
    } catch (error) {
      setError("Failed to fetch total posts. Please try again later.");
    }
  };

  const trimBodyTemplate = (rowData: any) => {
    const maxLength = 80;
    return rowData.body.length > maxLength
      ? rowData.body.substring(0, maxLength) + "..."
      : rowData.body;
  };

  const tableAction = (rowData: any) => {
    return (
      <div className="action_row_wrapper">
        <Button
          onClick={() => handleView(rowData)}
          icon="pi pi-eye"
          className="p-button-rounded p-button-primary"
          raised
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          raised
        />
        <Button
          onClick={confirm2}
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          raised
        />
      </div>
    );
  };

  const handleView = (rowData: any) => {
    setSelectedPost(rowData); // Store the selected post details
    setVisible(true); // Show the dialog
  };

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm2 = () => {
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  useEffect(() => {
    setHeading("Dynamic Heading for SomeComponent");
    fetchAllPosts();
  }, [setHeading]);

  // Filtered posts based on the search term (including id, title, and body)
  const filteredPosts = allPosts.filter(
    (post) =>
      post.id.toString().includes(searchTerm) || // Check if id includes the search term
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset search term
  const resetSearch = () => {
    setSearchTerm(""); // Clear the search term
  };

  // Delete selected posts
  const deleteSelectedPosts = () => {
    if (selectedProducts.length > 0) {
      const updatedPosts = allPosts.filter(
        (post) => !selectedProducts.includes(post)
      );
      setAllPosts(updatedPosts);
      setSelectedProducts([]);
      toast.current.show({
        severity: "success",
        summary: "Deleted",
        detail: "Selected posts have been deleted",
        life: 3000,
      });
    }
  };


  const exportCSV = (selectionOnly: boolean) => {
    dt.current.exportCSV({ selectionOnly });
  };

const exportPdf = () => {
    import('jspdf').then((jsPDF) => {
        import('jspdf-autotable').then(() => {
            const doc = new jsPDF.default("p", "pt");
            const exportColumns: never[] = []; // Declare and initialize the exportColumns variable
            const products: any[] = []; // Declare and initialize the products variable
            (doc as any).autoTable(exportColumns, products);
            doc.save('products.pdf');
        });
    });
};

const exportExcel = () => {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(filteredPosts);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        });

        saveAsExcelFile(excelBuffer, 'filteredPosts');
    });
};



const header = (
    
    <div className="table-heading">
    <div className="select-terminology-wrapper">
      <div className="post-search">
        {/* Input for search term */}
        <input
          type="text"
          className="custom_post_search"
          value={searchTerm} // Bind the input value to searchTerm
          onChange={(e) => setSearchTerm(e.target.value)} // Update state on input change
          placeholder="Search posts by id, title, or body..."
        />
        {/* Conditionally render the reset button */}
        {searchTerm && (
          <Button
            icon="pi pi-times"
            className="p-button-rounded p-button-danger close-btn"
            onClick={resetSearch} // Reset search on button click
          />
        )}
      </div>
      <div className="terminology-btn">
        {/* Conditionally render the Delete button with count */}
        {selectedProducts.length > 0 && (
          <Button
            label={`Delete Selected (${selectedProducts.length})`} // Display count in the button label
            icon="pi pi-trash"
            className="p-button-rounded p-button-danger delete-selected"
            onClick={deleteSelectedPosts} // Delete selected posts
            raised
          />
        )}
      </div>
    </div>

    <div className="add-post">
    <div className="flex gap-2 align-items-center justify-content-end doc-format">
        <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" />
        <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={exportPdf} data-pr-tooltip="PDF" />
    </div>
      <Link  className="p-button p-button-rounded create-post" to="/post/add-post">Create Post</Link>
    </div>
  </div>
);

  return (
    <div className="nagetive-wraaper">
      <div className="datatable-wrapper">
        <Toast ref={toast} />
        <ConfirmDialog />
        <Card>
          
          <DataTable
            className="post-table-outer"
            header={header}
            value={filteredPosts} // Use filteredPosts here
            size="normal"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 50]}
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            selectionMode={rowClick ? null : "checkbox"}
            selection={selectedProducts}
            onSelectionChange={(e: { value: any }) =>
              setSelectedProducts(e.value)
            }
            dataKey="id"
            scrollable
            scrollHeight="800px"
            sortMode="multiple"
            stripedRows
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
            ></Column>
            <Column field="id" header="Id" sortable></Column>
            <Column field="title" header="Title" sortable></Column>
            <Column field="body" header="Body" body={trimBodyTemplate}></Column>
            <Column header="Action" body={tableAction}></Column>
          </DataTable>
        </Card>

        <Dialog
          header="Post Details"
          visible={visible}
          style={{ width: "50vw" }}
          onHide={() => setVisible(false)}
          maximizable
        >
          {selectedPost && (
            <div className="post-songle-content-panel">
              <h2>{selectedPost.title}</h2>
              <p>{selectedPost.body}</p>
            </div>
          )}
        </Dialog>
      </div>
    </div>
  );
};

export default Posts;
function saveAsExcelFile(excelBuffer: any, arg1: string) {
    throw new Error("Function not implemented.");
}

