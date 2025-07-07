interface Props {
  id: string;
  children: React.ReactNode;
}

const Dialog = ({ id, children }: Props) => (
  <dialog id={id} className="modal">
    <div className="modal-box">
      {children}
      <div className="modal-action flex flex-row justify-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  </dialog>
);

export default Dialog;
