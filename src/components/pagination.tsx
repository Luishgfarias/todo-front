import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "./button";

const Pagination = ({ currentPage, totalPages, handlePageChange }: { currentPage: number, totalPages: number, handlePageChange: (page: number) => void }) => {

    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Ajusta se estamos no final
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Botão "Anterior"
    if (currentPage > 1) {
        pages.push(
            <Button
                key="prev"
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <FaArrowLeft />
            </Button>
        );
    }

    // Páginas numeradas
    for (let i = startPage; i <= endPage; i++) {
        pages.push(
            <Button
                key={i}
                disabled={i === currentPage}
                onClick={() => handlePageChange(i)}
            >
                {i}
            </Button>
        );
    }

    // Botão "Próxima"
    if (currentPage < totalPages) {
        pages.push(
            <Button
                key="next"
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <FaArrowRight />
            </Button>
        );
    }

    return (
        <div className="flex justify-center items-center gap-2 mt-6">
            {pages}
        </div>
    );
}

export default Pagination;