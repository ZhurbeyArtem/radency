import createNote from './func/createNote.js';
import renderMainTable from './render/renderMainTable.js';
import renderSummary from './render/renderSummary.js';
import { archiveAllNotes, deleteAllNotes, getNotes } from './data/notes.js';
import { renderArchivedTable, updateArchivedTables } from './func/updeteArchivedTables.js';

const mainTableBody = document.querySelector('tbody.main-table-body');
const mainTableHead = document.querySelector('table.main-table thead');

const deleteAllNotesBtn = mainTableHead.querySelector('.fas.fa-trash');
const archiveAllNotesBtn = mainTableHead.querySelector('.fas.fa-archive');
const createNoteBtn = document.querySelector('.button-create');

const sumTableBtns = document.querySelectorAll('.head.note-item.btn');

//initial render
renderMainTable();
renderSummary();

createNoteBtn.addEventListener('click', () => createNote(mainTableBody));

archiveAllNotesBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to archive all notes?')) {
    const sumTableBody = document.querySelectorAll('tbody.archived-items');
    archiveAllNotes();

    Array.from(sumTableBody).map(
      (body) => body.classList.contains('open') && renderArchivedTable(body, getNotes(), body.id),
    );

    renderMainTable();
    renderSummary();
  }
});

deleteAllNotesBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all notes?')) {
    const sumTableBody = document.querySelectorAll('tbody.archived-items');
    deleteAllNotes();

    Array.from(sumTableBody).map(
      (body) => body.classList.contains('open') && renderArchivedTable(body, getNotes(), body.id),
    );

    renderMainTable();
    renderSummary();
  }
});

Array.from(sumTableBtns).map((btn) =>
  btn.addEventListener('click', (e) =>
    updateArchivedTables(e.target.parentElement.parentElement.id)
   ),
);
