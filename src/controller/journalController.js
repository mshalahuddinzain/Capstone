const Journal = require('../model/journalModel');

// Mengambil semua jurnal
const getAllJournal = async (req, res) => {
    try {
        const journals = await Journal.find({});
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mengambil jurnal berdasarkan ID
const getJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await Journal.findById(id);
        if (!journal) {
            return res.status(404).json({ message: 'Cannot find any journal with that ID' });
        }
        res.status(200).json(journal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menambahkan jurnal
const addJournal = async (req, res) => {
    try {
        const journal = await Journal.create(req.body);
        res.status(201).json(journal); // Menggunakan status 201 untuk menandakan jurnal berhasil ditambahkan
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Menghapus jurnal berdasarkan ID
const deleteJournal = async (req, res) => {
    try {
        const { id } = req.params;
        const journal = await Journal.findByIdAndDelete(id);
        if (!journal) {
            return res.status(404).json({ message: 'Cannot find any journal with that ID' });
        }
        res.status(200).json({ message: 'Journal deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllJournal, getJournal, addJournal, deleteJournal };
