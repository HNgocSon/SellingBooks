import Banner from "../banner";
import SidebarCategories from "../categories/sidebar-categories";
import BooksList from "./books-list";
import SmallBanner from "./small-banner";

export default function BestSellingBooks() {
    return (
        <>
            <Banner />
            <main id="tg-main" className="tg-main tg-haslayout">
                <div className="tg-sectionspace tg-haslayout">
                    <div className="container">
                        <div className="row">
                            <div id="tg-twocolumns" className="tg-twocolumns">
                                <div className="col-xs-12 col-sm-8 col-md-8 col-lg-9 pull-right">
                                    <div id="tg-content" className="tg-content">
                                        <div className="tg-products">
                                            <div className="tg-sectionhead">
                                                <h2><span>People’s Choice</span>Bestselling Books</h2>
                                            </div>
                                            <SmallBanner />
                                            <BooksList />
                                        </div>
                                    </div>
                                </div>
                                <SidebarCategories />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            </>)
}