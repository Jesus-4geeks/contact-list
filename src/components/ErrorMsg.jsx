export const ErrorMsg = ({ msg }) => {
    return (
        <div className="text-center mb-5 mx-auto p-2 w-50 bg-danger border-red">
            {msg}
        </div>
    );
};