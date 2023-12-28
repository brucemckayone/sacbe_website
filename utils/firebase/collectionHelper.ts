import { APIResponse } from "@/app/api/types";
import { firestore } from "firebase-admin";
import { DocumentReference } from "firebase/firestore";

export default class CollectionHelper {
  private collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor(
    collection: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>
  ) {
    this.collection = collection;
  }

  async deleteAllDocsWithKeyValue(key: string, value: any) {
    try {
      // Query for documents in the collection with the specified key-value pair
      const querySnapshot = await this.collection.where(key, "==", value).get();

      if (querySnapshot.empty) {
        console.log("No documents found with the specified key-value pair.");
        return {
          ok: true,
          status: "success",
          message: "No documents found to delete.",
          deletedCount: 0,
        };
      }

      // Loop through the documents and delete them
      const deletePromises = querySnapshot.docs.map((doc) => doc.ref.delete());
      await Promise.all(deletePromises);

      console.log(`All documents with ${key}=${value} deleted.`);
      return {
        ok: true,
        status: "success",
        message: `All documents with ${key}=${value} deleted.`,
        deletedCount: querySnapshot.size,
      };
    } catch (error) {
      console.error("Error deleting documents:", error);
      return {
        ok: true,
        status: "error",
        message: "Error deleting documents.",
        error: error,
      };
    }
  }
  async deleteByDocId(id: string) {
    try {
      await this.collection.doc(id).delete();

      return {
        ok: true,
        status: "success",
        message: "Document successfully deleted.",
        documentId: id,
      };
    } catch (error) {
      console.error("Error deleting document:", error);

      return {
        ok: true,
        status: "success",
        message: "Error deleting document.",
        documentId: id,
        error: error,
      };
    }
  }

  async updateDoc(id: string, updates: any) {
    try {
      await this.collection!.doc(id).update(updates);

      return {
        ok: true,
        status: "success",
        message: "Update successful",
        updates: updates,
        documentId: id,
      };
    } catch (error) {
      console.error("Error updating document:", error);

      return {
        ok: false,
        status: "error",
        message: "Update failed",
        updates: updates,
        documentId: id,
        error: error,
      };
    }
  }

  async findAndUpdateDocByKeyValue(
    pair: { key: string; value: any },
    updates: any
  ) {
    try {
      const doc = await this.getDocsWithKeyValue(pair.key, pair.value, true);
      this.updateDoc(doc.documentId as string, updates);
      return {
        ok: true,
        status: "success",
        message: "Update successfull",
        updates: updates,
        documentId: doc.documentId,
      };
    } catch (e) {
      return {
        ok: false,
        status: "error",
        message: "Update failed",
        updates: updates,
        error: e,
      };
    }
  }

  async getDoc(id: string) {
    try {
      const docRef = this.collection!.doc(id);
      const doc = await docRef.get();

      if (!doc.exists) {
        console.log("No document found with the given ID.");
        return {
          ok: false,
          status: "error",
          message: "No document found with the given ID.",
          data: null,
        };
      }
      console.log("fetch successful");
      return {
        ok: true,
        status: "success",
        message: "Document found.",
        documentId: doc.id,
        data: doc.data(),
      };
    } catch (error) {
      console.error("Error fetching document:", error);
      return {
        ok: false,
        status: "error",
        message: "Error fetching document.",
        data: null,
        error: error,
      };
    }
  }

  async getAllDocs() {
    try {
      const querySnapshot = await this.collection!.get();

      if (querySnapshot.empty) {
        console.log("No documents found.");
        return {
          ok: false,
          status: "error",
          message: "No documents found.",
          data: [],
        };
      }

      return {
        ok: true,
        status: "success",
        message: "Documents found.",
        data: querySnapshot.docs.map((doc) => doc.data()),
      };
    } catch (error) {
      console.error("Error fetching documents:", error);
      return {
        ok: false,
        status: "error",
        message: "Error fetching documents.",
        data: null,
        error: error,
      };
    }
  }

  async getDocsWithKeyValue(
    key: string,
    value: any,
    getFirst?: boolean
  ): Promise<APIResponse<any>> {
    try {
      const querySnapshot = await this.collection!.where(
        key,
        "==",
        value
      ).get();

      if (querySnapshot.empty) {
        console.log("No documents found with the specified key-value pair.");
        return {
          ok: false,
          status: "error",
          message: "No documents found.",
          data: [],
          error: "",
        };
      }

      if (getFirst) {
        return {
          ok: true,
          status: "success",
          message: "Document found.",
          documentId: querySnapshot.docs[0].id,
          data: querySnapshot.docs[0].data(),
        };
      }

      return {
        ok: true,
        status: "success",
        message: "Documents found.",
        documentId: querySnapshot.docs.map((e) => e.id).toString(),
        data: querySnapshot.docs.map((doc) => doc.data()),
      };
    } catch (error) {
      console.error("Error fetching documents:", error);
      return {
        ok: false,
        status: "error",
        message: "Error fetching documents.",
        error: error,
        data: null,
      };
    }
  }

  async getByDocReference(refs: DocumentReference[]) {
    return await this.collection
      .where(
        firestore.FieldPath.documentId(),
        "in",
        refs.map((e) => e.id)
      )
      .get()
      .then((res) => {
        console.log("Successfully fetched documents by referance");
        return {
          ok: true,
          status: "Success",
          message: "Successfully fetched documents by referance",
          data: res.docs.map((e) => e.data()),
        };
      })
      .catch((e) => {
        console.error("There was an error fetching documents by refereance");
        return {
          ok: false,
          status: "error",
          message: "There was an error fetching documents by refereance",
          data: null,
          error: e,
        };
      });
  }

  async getDocumentsWithFilters(filters: {
    before: string;
    after: string;
    categories: string[];
    tags: string[];
  }) {
    try {
      let query: FirebaseFirestore.Query = this.collection;

      // Apply 'before' and 'after' filters
      if (filters.before) {
        query = query.where("lastModified", "<", new Date(filters.before));
      }
      if (filters.after) {
        query = query.where("lastModified", ">", new Date(filters.after));
      }

      // Apply 'categories' filter
      if (filters.categories && filters.categories.length > 0) {
        query = query.where(
          "categories",
          "array-contains-any",
          filters.categories
        );
      }

      // Apply 'tags' filter
      if (filters.tags && filters.tags.length > 0) {
        query = query.where("tags", "array-contains-any", filters.tags);
      }

      const querySnapshot = await query.get();

      if (querySnapshot.empty) {
        return {
          ok: true,
          status: "success",
          message: "No documents found with the specified filters.",
          data: [],
        };
      }

      return {
        ok: true,
        status: "success",
        message: "Documents found.",
        data: querySnapshot.docs.map((doc) => doc.data()),
      };
    } catch (error) {
      console.error("Error fetching documents with filters:", error);
      return {
        ok: true,
        status: "success",
        message: "Error fetching documents.",
        error: error,
      };
    }
  }

  async createDocument(
    body: firestore.WithFieldValue<firestore.DocumentData>,
    id?: string | undefined
  ) {
    if (id) {
      return await this.collection
        .doc(id)
        .set(body)
        .then(() => {
          return {
            ok: true,
            status: "success",
            message: `document ${id} has been created in collection 'affiliate_requests'`,
            body: body,
            documentId: id,
          };
        })
        .catch(() => {
          return {
            ok: false,
            status: "error",
            message: ` There was an error when creating document ${id} in collection 'affiliate_requests'`,
            body: body,
            documentId: id,
          };
        });
    } else
      return this.collection
        .add(body)
        .then((res) => {
          return {
            ok: true,
            status: "success",
            message: `document ${res.id} has been created in collection 'affiliate_requests'`,
            body: body,
            documentId: res.id,
          };
        })
        .catch((e) => {
          return {
            ok: false,
            status: "error",
            message: `There was an error when creating document in collection 'affiliate_requests'`,
            body: body,
          };
        });
  }
  async docExists(id: string) {
    return (await this.collection.doc(id).get()).exists;
  }
}
