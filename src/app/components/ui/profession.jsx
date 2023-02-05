import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { getProfessions, getProfessionsLoadStatus } from "../../store/professions";

const Profession = ({ id }) => {
    const professionsList = useSelector(getProfessions());
    const isLoading = useSelector(getProfessionsLoadStatus());

    const profession = professionsList.find((p) => p._id === id);
    return isLoading ? "Loading..." : <p>{profession.name}</p>;
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
