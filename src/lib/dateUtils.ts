/**
 * Formata uma data ISO string para exibição local, evitando problemas de fuso horário
 * @param dateString - String da data em formato ISO (YYYY-MM-DD ou YYYY-MM-DDTHH:mm:ss)
 * @returns String formatada para pt-BR ou "Não informado" se inválida
 */
export const formatDateForDisplay = (dateString: string | null | undefined): string => {
    if (!dateString) return "Não informado";
    
    try {
        // Se for apenas uma data (YYYY-MM-DD), adiciona horário local para evitar problemas de timezone
        const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
        
        let date: Date;
        if (isDateOnly) {
            // Para datas apenas (sem hora), cria a data no timezone local
            const [year, month, day] = dateString.split('-').map(Number);
            date = new Date(year, month - 1, day); // month é 0-indexed
        } else {
            // Para datas com horário, usa normalmente
            date = new Date(dateString);
        }
        
        return date.toLocaleDateString("pt-BR");
    } catch (error) {
        console.error("Erro ao formatar data:", error);
        return "Data inválida";
    }
};

/**
 * Converte uma data ISO para o formato YYYY-MM-DD para inputs do tipo date
 * @param dateString - String da data em formato ISO
 * @returns String no formato YYYY-MM-DD ou string vazia se inválida
 */
export const formatDateForInput = (dateString: string | null | undefined): string => {
    if (!dateString) return "";
    
    try {
        const date = new Date(dateString);
        // Ajusta para timezone local para evitar mudança de dia
        const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
        return localDate.toISOString().split('T')[0];
    } catch (error) {
        console.error("Erro ao formatar data para input:", error);
        return "";
    }
};

/**
 * Converte uma data do input (YYYY-MM-DD) para formato ISO correto para envio
 * @param dateString - String da data no formato YYYY-MM-DD do input
 * @returns String no formato ISO (YYYY-MM-DDTHH:mm:ss.sssZ) ou string original se inválida
 */
export const formatDateForSubmit = (dateString: string | null | undefined): string | undefined => {
    if (!dateString) return undefined;
    
    try {
        // Cria a data no timezone local para evitar mudança de dia
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day, 12, 0, 0); // meio-dia para evitar problemas de timezone
        
        return date.toISOString();
    } catch (error) {
        console.error("Erro ao formatar data para envio:", error);
        return dateString; // Retorna original em caso de erro
    }
};
