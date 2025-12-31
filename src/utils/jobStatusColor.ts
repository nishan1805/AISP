export const getJobStatusColor = (status: string) => {
    switch (status) {
        case 'Regular':
            return 'bg-[#E6F6E6] text-[#01A100] border border-[#E6F6E6]';
        case 'Part-Time':
            return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'Contract':
            return 'bg-orange-100 text-orange-800 border-orange-200';
        default:
            return 'bg-gray-100 text-gray-800 border-gray-200';
    }
};
