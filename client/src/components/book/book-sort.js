export default function BookSort() {
    return (<>
        <div className="tg-refinesearch">
            <span>showing 1 to 8 of 20 total</span>
            <form className="tg-formtheme tg-formsortshoitems">
                <fieldset>
                    <div className="form-group">
                        <label>Sort by: </label>
                        <span className="tg-select">
                            <select>
                                <option>Bán chạy nhất</option>
                                <option>Tên A-Z</option>
                                <option>Tên Z-A</option>
                                <option>Giá tăng dần</option>
                                <option>Giá giảm dần</option>
                                <option>Mới nhất</option>
                                <option>Cữ nhất</option>
                            </select>
                        </span>
                    </div>
                    <div className="form-group">
                        <label>show:</label>
                        <span className="tg-select">
                            <select>
                                <option>8</option>
                                <option>16</option>
                                <option>20</option>
                            </select>
                        </span>
                    </div>
                </fieldset>
            </form>
        </div>
    </>);
}