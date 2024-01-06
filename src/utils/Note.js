import Swal from "sweetalert2";
import axios from "axios";

let userToken = localStorage.getItem("userToken");
let headers = {
    token: userToken,
};
export function showAddModal({ headers, user }) {
    Swal.fire({
        title: "Add Note 📓",
        html: `
        <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control"/>
        <textarea type="text" class="form-control mt-3" id="content" name="content" placeholder="Enter a Description"></textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Add",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            return { title, content };
        },
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        addNote({
            title: result.value.title,
            content: result.value.content,
            headers,
            user,
        });
    });
}

async function addNote({ title, content, user }) {
    const { data } = await axios.post(
        `https://note-sigma-black.vercel.app/api/v1/notes`,
        { title, content },
        { headers }
    );
    if (data.msg === "done") {
        getUserNotes({ user });
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Note has been add",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}

export async function getUserNotes({ user }) {
    try {
        const { data } = await axios.get(
            `https://note-sigma-black.vercel.app/api/v1/notes`,
            { headers }
        );
        user(data.notes);
    } catch (error) {
        user([]);
    }
}

export function showDeleteModal({ headers, noteId, user }) {
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            deleteNote({ headers, noteId, user });
        }
    });
}

async function deleteNote({ noteId, user }) {
    const { data } = await axios.delete(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        { headers }
    );
    getUserNotes({ user });
    Swal.fire({
        title: "Deleted!",
        text: "Your Note has been deleted.",
        icon: "success",
    });
}

export function showUpdateModal({ prevTitle, prevContent, headers, noteId, user }) {
    Swal.fire({
        title: "Update Note 📝",
        html: `
        <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control" value="${prevTitle}"/>
        <textarea type="text" class="form-control mt-3" id="content" name="content" placeholder="Enter a Description">${prevContent}</textarea>
        `,
        showCancelButton: true,
        confirmButtonText: "Update",
        showLoaderOnConfirm: true,
        preConfirm: () => {
            const title = document.getElementById("title").value;
            const content = document.getElementById("content").value;
            return { title, content };
        },
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        updateNote({
            title: result.value.title,
            content: result.value.content,
            headers,
            user,
            noteId
        });
    });
}

async function updateNote({ noteId, title, content, user }) {
    const { data } = await axios.put(
        `https://note-sigma-black.vercel.app/api/v1/notes/${noteId}`,
        { title, content },
        { headers }
    );
    if (data.msg === "done") {
        getUserNotes({ user });
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Your Note has been Updated",
            showConfirmButton: false,
            timer: 1500,
        });
    }
}
